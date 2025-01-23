import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { AuthEntity, UrlEntity } from "./entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  entities: [UrlEntity, AuthEntity],
  logging: false,
  synchronize: true,
});