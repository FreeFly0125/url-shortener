import express from "express";
import cors from "cors";
import { MESSAGES } from "consts";
import { Logger } from "utils";

export const backendSetup = async () => {
  const app = express();

  app
    .use(cors())
    .use(express.json())
    .use("/health", (_req, res) => res.send("OK"));

  const PORT = process.env.SERVER_PORT || 4000;

  app.listen(PORT, () => {
    Logger.log(MESSAGES.MSG_SERVER_STARTED);
  });
};