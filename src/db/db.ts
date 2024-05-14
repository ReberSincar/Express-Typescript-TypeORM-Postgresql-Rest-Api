import { DataSource } from "typeorm";
import { Book } from "../book/entity/book.entity";
import { User } from "../user/entity/user.entity";
import { UserBook } from "../user/entity/user_book.entity";
import { DbInitial1715706785384 } from "./migrations/1715706785384-db-initial";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [User, Book, UserBook],
  migrations: [DbInitial1715706785384],
  logging: false,
  synchronize: process.env.POSTGRES_SYNCRONIZE == "true",
  migrationsRun: process.env.POSTGRES_RUN_MIGRATIONS == "true",
});
