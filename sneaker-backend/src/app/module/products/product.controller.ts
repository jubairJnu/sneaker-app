import {Request, Response} from "express";
import status from "http-status";
import catchAsync from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import {productServices} from "./product.servivce";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProduct(req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Sneakers created succesfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getAllProducts(req.query);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Sneakers retrieved succesfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProduct,
};
