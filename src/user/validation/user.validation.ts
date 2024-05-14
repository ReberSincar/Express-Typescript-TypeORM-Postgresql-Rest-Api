import validateRequest from "../../middleware/validate_request";
import { CreateUserDto } from "../dto/create-user.dto";
import { NextFunction, Request, Response } from "express";
import { ReturnBookDto } from "../dto/return-book.dto";

export const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await validateRequest(CreateUserDto, req, res, next);
};

export const validateReturnBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateRequest(ReturnBookDto, req, res, next);
};
