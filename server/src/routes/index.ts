import { Router } from "express";
import urlRouter from "./urlRoute";
import authRouter from "./authRoute";

const appRouter = Router();

appRouter.use("/url", urlRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
