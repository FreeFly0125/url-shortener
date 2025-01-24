import { AppDataSource } from "database";
import { UrlEntity } from "database/entity";

export const getAll = async (username: string) => {
  return await AppDataSource.getRepository(UrlEntity).find({
    where: {
      username: username,
    },
  });
};

export const getShorten = async (orgUrl: string, username: string) => {
  return await AppDataSource.getRepository(UrlEntity).findOneBy({
    origin: orgUrl,
    username: username,
  });
};

export const getOrigin = async (shortUrl: string, username: string) => {
  const result = await AppDataSource.getRepository(UrlEntity).findOneBy({
    shorten: shortUrl,
    username: username,
  });
  return result;
};

export const newUrlSet = async (
  orgUrl: string,
  shortUrl: string,
  username: string
) => {
  return await AppDataSource.getRepository(UrlEntity).insert({
    origin: orgUrl,
    shorten: shortUrl,
    username: username,
  });
};

export const updateUrl = async (
  id: number,
  newUrl: string,
  username: string
) => {
  const result = await AppDataSource.getRepository(UrlEntity).update(
    { id: id, username: username },
    {
      shorten: newUrl,
    }
  );
  return result;
};

export const deleteUrl = async (id: number) => {
  const result = await AppDataSource.getRepository(UrlEntity).delete({
    id: id,
  });
  return result;
};
