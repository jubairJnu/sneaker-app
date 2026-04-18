import {ReservationStatus} from "@prisma/client";
import {emitProductStockUpdate} from "../../socket";
import prisma from "../../utils/prisma";
import {IReserve} from "./reserve.interface";

const createReservation = async (payload: IReserve) => {
  try {
    const trxResult = await prisma.$transaction(async (tx) => {
      const {productId} = payload;

      //? step :1 checking product availablity using row level lock

      const products: any = await tx.$queryRaw`
      SELECT id, "availableStock" FROM "products"
      WHERE Id = ${productId}

      FOR UPDATE
      `;

      console.log(products, "products");
      const product = products[0];

      if (!product || product.availableStock <= 0) {
        throw new Error("Sold Out");
      }

      //?  step :2 i have to create a user into user table

      let user = await tx.user.findUnique({
        where: {clientId: payload.clientId},
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            userName: payload.userName,
            clientId: payload.clientId,
          },
        });
      }

      const productInfo = await tx.product.update({
        where: {id: productId, availableStock: {gt: 0}},
        data: {availableStock: {decrement: 1}},
      });

      //   step 3 reserveration create

      const newReservation = await tx.reservation.create({
        data: {
          productId,
          userId: user.id,
          amount: productInfo?.price,
          quantity: 1,
          status: ReservationStatus.PENDING,
          expiresAt: new Date(Date.now() + 60000),
        },
      });
      emitProductStockUpdate({
        productId: newReservation.productId,
        availableStock: productInfo.availableStock,
      });

      return newReservation;
    });

    return trxResult;
  } catch (err) {
    throw err;
  }
};

const getReservationByUserId = async (userId: string) => {
  return await prisma.reservation.findMany({
    where: {
      userId,
    },
  });
};

export const reservationService = {
  createReservation,
  getReservationByUserId,
};
