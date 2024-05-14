import validateRequest from "../../middleware/validate_request";
import { NextFunction, Request, Response } from "express";
import { CreateBookDto } from "../dto/create-book.dto";

export const validateCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await validateRequest(CreateBookDto, req, res, next);
};
