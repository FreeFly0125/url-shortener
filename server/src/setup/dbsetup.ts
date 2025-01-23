import { MESSAGES } from "consts";
import { AppDataSource } from "database";
import { createDatabase } from "typeorm-extension";
import { Logger } from "utils";

export const dbSetup = async () => {
  await createDatabase({
    ifNotExist: true,
    options: AppDataSource.options,
  });

  await AppDataSource.initialize();

  Logger.info(MESSAGES.MSG_DB_CONNECTED);
};