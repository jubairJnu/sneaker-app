import {ReservationStatus} from "@prisma/client";
import cron from "node-cron";
import {emitProductStockUpdate} from "../../../socket";
import prisma from "../../../utils/prisma";

export const startReservationCron = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      await prisma.$transaction(async (tx) => {
        const expiredReservations = await tx.reservation.findMany({
          where: {
            status: ReservationStatus.PENDING,
            expiresAt: {lt: new Date()},
          },
        });

        if (expiredReservations.length > 0) {
          for (const res of expiredReservations) {
            const updatedProduct = await tx.product.update({
              where: {id: res.productId},
              data: {availableStock: {increment: 1}},
            });

            await tx.reservation.update({
              where: {id: res.id},
              data: {status: ReservationStatus.EXPIRED},
            });

            emitProductStockUpdate({
              productId: res.productId,
              availableStock: updatedProduct.availableStock,
            });
          }
        }
      });
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};
