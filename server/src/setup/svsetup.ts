import express from "express";
import cors from "cors";
import { MESSAGES } from "consts";
import { Logger } from "utils";
import appRouter from "routes";

export const backendSetup = async () => {
  const app = express();

  app
    .use(cors())
    .use(express.json())
    .use("/health", (_req, res) => res.send("OK"))
    .use(appRouter);

  const PORT = process.env.SERVER_PORT || 4000;

  app.listen(PORT, () => {
    Logger.log(MESSAGES.MSG_SERVER_STARTED);
  });
};