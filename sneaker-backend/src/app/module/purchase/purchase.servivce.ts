import {ReservationStatus} from "@prisma/client";
import {emitSuccesPurchase} from "../../../socket";
import prisma from "../../../utils/prisma";
import {IPurchase} from "./purchase.interface";

const createPurchase = async (payload: IPurchase) => {
  const trxResult = await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: {
        id: payload.reservationId,
        userId: payload.userId,
      },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new Error("Product Reservation not valid");
    }

    const result = await tx.purchase.create({
      data: {
        productId: reservation.productId,
        amount: reservation.amount,
        reservationId: reservation.id,
        quantity: reservation.quantity ?? 1,
        userId: reservation.userId,
      },
    });

    await tx.reservation.update({
      where: {id: payload.reservationId},
      data: {
        status: ReservationStatus.COMPLETED,
      },
    });

    return {reservation, result};
  });

  emitSuccesPurchase({
    productId: trxResult.reservation.productId,
    userName: trxResult.reservation.user.userName,
  });

  return trxResult;
};

const getLastThreePurchase = async () => {
  return await prisma.product.findMany({
    include: {
      purchases: {
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
      },
    },
  });
};

export const purchaseServices = {
  createPurchase,
  getLastThreePurchase,
};
