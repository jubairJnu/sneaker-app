import {type NextFunction, type Request, type Response} from "express";
import status from "http-status";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    err: `${req.originalUrl} not found`,
  });
};
