import { Router } from "express";
import urlRouter from "./urlRoute";
import authRouter from "./authRoute";
import authenticateToken from "middleware";

const appRouter = Router();

appRouter.use("/url", authenticateToken, urlRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
