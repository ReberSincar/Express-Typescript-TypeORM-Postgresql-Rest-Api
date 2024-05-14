import { NextFunction, Request, Response } from "express";
import userRepository from "../repository/user.repository";
import { User } from "../entity/user.entity";
import { notAcceptable, notFound } from "../../errors/api_error";

const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = await userRepository.getUserById(
    parseInt(req.params.userId)
  );
  if (!user) notFound("User not found");
  res.locals.user = user;
  next();
};

const checkBookNotBorrowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = parseInt(req.params.bookId);
  const isBookBorrowed = await userRepository.isBookBorrowed(bookId);
  if (isBookBorrowed) return notAcceptable("Book already borrowed");
  next();
};

export default {
  checkUserExist,
  checkBookNotBorrowed,
};
