import { User } from "../entity/user.entity";
import { UserBook } from "../entity/user_book.entity";
import { IsNull } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

const getUsers = (relations?: boolean) => {
  return User.find({
    relations: relations
      ? {
          books: {
            book: true,
          },
        }
      : null,
  });
};

const getUserById = (id: number) => {
  return User.findOne({
    where: { id },
    relations: {
      books: {
        book: true,
      },
    },
  });
};

const createUser = (body: CreateUserDto) => {
  return User.save({ ...body });
};

const getBorrowedBook = (userId: number, bookId: number) => {
  return UserBook.findOne({
    where: {
      userId,
      bookId,
    },
    order: {
      createdAt: "DESC",
    },
  });
};

const createUserBook = (userId: number, bookId: number) => {
  return UserBook.save({
    userId,
    bookId,
  });
};

const updateUserScore = async (id: number, userScore: number) => {
  return UserBook.update({ id }, { userScore });
};

const isBookBorrowed = async (bookId: number) => {
  const isBookBorrowed = await UserBook.findOneBy({
    bookId,
    userScore: IsNull(),
  });
  return !!isBookBorrowed;
};

export default {
  createUser,
  getUsers,
  getUserById,
  getBorrowedBook,
  createUserBook,
  updateUserScore,
  isBookBorrowed,
};
