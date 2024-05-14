import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("express-async-errors");

import userRouter from "./user/router/user.router";
import bookRouter from "./book/router/book.router";
import { apiErrorHandler } from "./errors/api_error_handler";

declare global {
  namespace Express {
    export interface Response {
      success(data: any): Response;
      created(data?: any): Response;
      noContent(): Response;
    }
  }
}

const app: Application = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.success = function (data: any) {
    return res.status(200).json(data);
  };

  res.created = function (data?: any) {
    return res.status(201).json(data);
  };

  res.noContent = function () {
    return res.status(204).json();
  };

  next();
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.use(apiErrorHandler);

export default app;