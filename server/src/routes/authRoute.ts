import { AuthController } from "controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signin", AuthController.signIn);
authRouter.post("/signup", AuthController.signUp);

export default authRouter;
