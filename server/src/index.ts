import dotenv from "dotenv";
import { backendSetup, dbSetup } from "setup";
import { Logger } from "utils";

dotenv.config();

const setupServer = async () => {
  try {
    await dbSetup();
  } catch (err) {
    Logger.error("Failed to connect DB:", err);
    return;
  }

  try {
    await backendSetup();
  } catch (err) {
    Logger.error("Failed to start Server:", err);
    return;
  }
};

setupServer();