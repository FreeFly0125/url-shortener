import { AppDataSource } from "database";
import { AuthEntity } from "database/entity";

export const getUser = async (username: string, password: string) => {
  const user = await AppDataSource.getRepository(AuthEntity).findOneBy({
    username: username,
  });

  if (!user) return { username: "", password: "" };
  else if (user.password !== password)
    return { username: user.username, password: "" };
  else return user;
};

export const newUser = async (username: string, password: string) => {
  return await AppDataSource.getRepository(AuthEntity).insert({
    username: username,
    password: password,
  });
};
