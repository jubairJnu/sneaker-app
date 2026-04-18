import {ReservationStatus} from "@prisma/client";
import prisma from "../../../utils/prisma";
import {IPurchase} from "./purchase.interface";

const createPurchase = async (payload: IPurchase) => {
  const trxResult = await prisma.$transaction(async (tx) => {
    const reservation = await prisma.reservation.findUnique({
      where: {
        userId_productId_status: {
          userId: payload.userId,
          productId: payload.productId,
          status: ReservationStatus.PENDING,
        },
      },
    });

    if (!reservation) {
      throw new Error("Product Reservation not valid");
    }

    const result = await prisma.purchase.create({
      data: {
        productId: reservation.productId,
        amount: reservation.amount,
        reservationId: reservation.id,
        quantity: reservation.quantity ?? 1,
        userId: reservation.userId,
      },
    });
    return result;
  });
  return trxResult;
};

const getLastThreePurchase = async () => {
  return await prisma.product.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const purchaseServices = {
  createPurchase,
  getLastThreePurchase,
};
