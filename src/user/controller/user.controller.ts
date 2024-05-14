import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import { notAcceptable } from "../../errors/api_error";
import { CreateUserDto } from "../dto/create-user.dto";
import { ReturnBookDto } from "../dto/return-book.dto";
import { Book } from "../../book/entity/book.entity";
import bookRepository from "../../book/repository/book.repository";

const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.getUsers();
  const dtos = users.map((e) => e.toUserDto());
  return res.success(dtos);
};

const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const user = await userRepository.getUserById(userId);
  return res.success(user.toUserRelationalDto());
};

const createUser = async (req: Request, res: Response) => {
  const body: CreateUserDto = req.body;
  await userRepository.createUser(body);
  return res.created();
};

const borrowBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  await userRepository.createUserBook(userId, bookId);
  return res.noContent();
};

const returnBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);

  const body: ReturnBookDto = req.body;
  const book: Book = res.locals.book;

  const borrowedBook = await userRepository.getBorrowedBook(userId, bookId);
  if (!borrowedBook) return notAcceptable("Book is not borrowed by user");

  if (borrowedBook.userScore) return notAcceptable("Book already returned");

  await userRepository.updateUserScore(borrowedBook.id, body.score);
  const totalScore = book.totalScore + body.score;
  const scoringCount = book.scoringCount + 1;
  await bookRepository.updateBookScore(bookId, totalScore, scoringCount);
  return res.noContent();
};

export default {
  createUser,
  getUsers,
  getUserById,
  borrowBook,
  returnBook,
};
