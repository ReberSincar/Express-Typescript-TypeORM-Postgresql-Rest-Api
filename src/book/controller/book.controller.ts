import { Request, Response } from "express";
import bookRepository from "../repository/book.repository";
import { CreateBookDto } from "../dto/create-book.dto";

const getBooks = async (req: Request, res: Response) => {
  const books = await bookRepository.getBooks();
  const dtos = books.map((e) => e.toBookDto());
  return res.success(dtos);
};

const getBookById = async (req: Request, res: Response) => {
  const book = await bookRepository.getBookById(parseInt(req.params.bookId));
  return res.success(book.toBookDtoWithScore());
};

const createBook = async (req: Request, res: Response) => {
  const body: CreateBookDto = req.body;

  await bookRepository.createBook(body);
  return res.created();
};

export default {
  createBook,
  getBooks,
  getBookById,
};
