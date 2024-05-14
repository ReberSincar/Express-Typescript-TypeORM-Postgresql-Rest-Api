import { Router } from "express";
import userController from "../controller/user.controller";
import userMiddleware from "../middleware/user.middleware";
import bookMiddleware from "../../book/middleware/book.middleware";
import {
  validateCreateUser,
  validateReturnBook,
} from "../validation/user.validation";

const router: Router = Router();

router.post("/", validateCreateUser, userController.createUser);
router.get("/", userController.getUsers);
router.get(
  "/:userId",
  userMiddleware.checkUserExist,
  userController.getUserById
);

router.post(
  "/:userId/borrow/:bookId",
  userMiddleware.checkUserExist,
  bookMiddleware.checkBookExist,
  userMiddleware.checkBookNotBorrowed,
  userController.borrowBook
);
router.post(
  "/:userId/return/:bookId",
  validateReturnBook,
  userMiddleware.checkUserExist,
  bookMiddleware.checkBookExist,
  userController.returnBook
);

export default router;
