import { Router } from "express";
import bookController from "../controller/book.controller";
import bookMiddleware from "../middleware/book.middleware";
import { validateCreateBook } from "../validation/book.validation";

const router: Router = Router();

router.post("/", validateCreateBook, bookController.createBook);
router.get("/", bookController.getBooks);
router.get(
  "/:bookId",
  bookMiddleware.checkBookExist,
  bookController.getBookById
);

export default router;
