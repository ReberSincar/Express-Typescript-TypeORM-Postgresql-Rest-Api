import * as dotenv from 'dotenv'
dotenv.config();


import { dataSource } from "./db/db";
import app from "./app";

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection`);
  try {
    dataSource.initialize();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  console.log(`Starting server on port ${process.env.PORT}`);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}

init();
