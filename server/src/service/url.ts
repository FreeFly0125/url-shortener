import { AppDataSource } from "database";
import { UrlEntity } from "database/entity";

export const get_all = async () => {
  return await AppDataSource.getRepository(UrlEntity).find();
};

export const get_shorten_url = async (orgUrl: string) => {
  return await AppDataSource.getRepository(UrlEntity).findOneBy({
    origin: orgUrl,
  });
};

export const get_origin_url = async (shortUrl: string) => {
  const result = await AppDataSource.getRepository(UrlEntity).findOneBy({
    shorten: shortUrl,
  });
  return result;
};

export const new_url_set = async (orgUrl: string, shortUrl: string) => {
  return await AppDataSource.getRepository(UrlEntity).insert({
    origin: orgUrl,
    shorten: shortUrl,
  });
};
