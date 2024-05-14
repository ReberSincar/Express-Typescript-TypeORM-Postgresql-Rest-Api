import { ApiError } from "./api_error";
import { Request, Response, NextFunction } from "express";

export const apiErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json(
      err.error
        ? {
            message: err.message,
            error: err.error,
          }
        : {
            message: err.message,
          }
    );
  }

  return res.status(500).json({
    message: (err as Error).message,
    error: err,
  });
};
