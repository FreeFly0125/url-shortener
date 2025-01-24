import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "secret";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, TOKEN_SECRET, (err, data: { username: string }) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.query.username = data.username;
    next();
  });
};

export default authenticateToken;
