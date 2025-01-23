import { Router } from "express";
import urlRouter from "./urlRoute";

const appRouter = Router();

appRouter.use("/url", urlRouter);

export default appRouter;
