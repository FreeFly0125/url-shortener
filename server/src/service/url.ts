import { AppDataSource } from "database";
import { UrlEntity } from "database/entity";

export const getAll = async () => {
  return await AppDataSource.getRepository(UrlEntity).find();
};

export const getShorten = async (orgUrl: string) => {
  return await AppDataSource.getRepository(UrlEntity).findOneBy({
    origin: orgUrl,
  });
};

export const getOrigin = async (shortUrl: string) => {
  const result = await AppDataSource.getRepository(UrlEntity).findOneBy({
    shorten: shortUrl,
  });
  return result;
};

export const newUrlSet = async (orgUrl: string, shortUrl: string) => {
  return await AppDataSource.getRepository(UrlEntity).insert({
    origin: orgUrl,
    shorten: shortUrl,
  });
};

export const updateUrl = async (id: number, newUrl: string) => {
  const result = await AppDataSource.getRepository(UrlEntity).update(
    { id: id },
    {
      shorten: newUrl,
    }
  );
  return result;
};
