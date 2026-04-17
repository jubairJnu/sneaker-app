import {Request, Response} from "express";
import status from "http-status";
import catchAsync from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import {purchaseServices} from "./purchase.servivce";

const createPurchase = catchAsync(async (req: Request, res: Response) => {
  const result = await purchaseServices.createPurchase(req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Purchase created succesfully",
    data: result,
  });
});

const getAllPurchase = catchAsync(async (req: Request, res: Response) => {
  const result = await purchaseServices.getLastThreePurchase();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Purchase retrieved succesfully",
    data: result,
  });
});

export const purchaseControllers = {
  createPurchase,
  getAllPurchase,
};
