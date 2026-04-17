import {Request, Response} from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsyn";
import sendResponse from "../../utils/sendResponse";
import {reservationService} from "./reserve.service";

const createReservation = catchAsync(async (req: Request, res: Response) => {
  const result = await reservationService.createReservation(req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Reservation created succesfully",
    data: result,
  });
});

export const reservationController = {
  createReservation,
};
