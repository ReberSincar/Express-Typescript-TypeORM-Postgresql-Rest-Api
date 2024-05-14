import { CreateBookDto } from "../dto/create-book.dto";
import { Book } from "../entity/book.entity";

const getBooks = () => {
  return Book.find();
};

const getBookById = (id: number) => {
  return Book.findOneBy({ id });
};

const createBook = (dto: CreateBookDto) => {
  return Book.save({ ...dto });
};

const updateBookScore = (
  bookId: number,
  totalScore: number,
  scoringCount: number
) => {
  return Book.update(
    { id: bookId },
    {
      totalScore,
      scoringCount,
    }
  );
};

export default {
  getBooks,
  getBookById,
  createBook,
  updateBookScore,
};
