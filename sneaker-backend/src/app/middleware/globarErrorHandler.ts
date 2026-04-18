import {type NextFunction, type Request, type Response} from "express";
import {status} from "http-status";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorMessage = "An unexpected error occurred";

  if (err?.message) {
    if (err.code === "P2002") {
      const modelName = err.meta?.modelName;
      const constraintFields =
        err.meta?.driverAdapterError?.cause?.constraint?.fields;

      if (modelName === "Reservation") {
        if (
          constraintFields &&
          constraintFields.includes("userId") &&
          constraintFields.includes("productId")
        ) {
          errorMessage =
            "You already have a pending reservation for this product. Please complete or cancel the existing reservation first.";
        } else {
          errorMessage = "A reservation with these details already exists.";
        }
      } else if (modelName === "User") {
        if (constraintFields && constraintFields.includes("clientId")) {
          errorMessage =
            "An account with this client ID already exists. Please use a different client ID.";
        } else if (constraintFields && constraintFields.includes("userName")) {
          errorMessage =
            "This username is already taken. Please choose a different username.";
        } else {
          errorMessage = "A user with these details already exists.";
        }
      } else if (modelName === "Product") {
        errorMessage =
          "A product with these details already exists in the system.";
      } else {
        // Generic fallback for other models
        if (constraintFields && constraintFields.length > 0) {
          const fieldNames = constraintFields.map((field: string) =>
            field.replace(/"/g, ""),
          );
          errorMessage = `A record with this ${fieldNames.join(" and ")} already exists.`;
        } else {
          errorMessage = "This record already exists in the system.";
        }
      }
    }
  }

  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    stack: err.stack,
    message: errorMessage,
    error: err,
  });
};
