import { NextFunction, Request, Response } from "express";
import bookRepository from "../repository/book.repository";
import { Book } from "../entity/book.entity";
import { notFound } from "../../errors/api_error";

const checkBookExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const book: Book = await bookRepository.getBookById(
    parseInt(req.params.bookId)
  );
  if (!book) return notFound("Book not found");

  res.locals.book = book;
  next();
};

export default {
  checkBookExist,
};
