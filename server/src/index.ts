import { MESSAGES } from "consts";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Logger } from "utils";
import { AppDataSource } from "database";
import appRoute from "routes";

dotenv.config();

const app = express();

const dbConnect = (next: NextFunction) => {
  try {
    AppDataSource.initialize();
    Logger.error(MESSAGES.MSG_DB_CONNECTED);
    next();
  } catch (err) {
    Logger.error(err);
  }
};

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"))
  .use(appRoute);

const PORT = process.env.SERVER_PORT || 4000;

dbConnect(() => {
  app.listen(PORT, () => {
    Logger.log(MESSAGES.MSG_SERVER_STARTED);
  });
});

export default app;
