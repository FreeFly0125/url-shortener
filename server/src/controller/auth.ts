import { Request, Response } from "express";
import { AuthService } from "service";

interface AuthData {
  username: string;
  password: string;
}

export const signIn = async (req: Request, res: Response) => {
  const data: AuthData = req.body;

  const result = await AuthService.getUser(data.username, data.password);
  if (!result.username) return res.status(404).send("User not found!");
  else if (!result.password) return res.status(401).send("Incorrect password!");
  else return res.status(200).send({ username: result.username });
};

export const signUp = async (req: Request, res: Response) => {
  const data: AuthData = req.body;

  const user = await AuthService.getUser(data.username, data.password);
  if (user.username) return res.status(409).send({ success: false });

  const result = await AuthService.newUser(data.username, data.password);
  return result
    ? res.status(200).send({ success: true })
    : res.status(500).send({ success: false });
};
