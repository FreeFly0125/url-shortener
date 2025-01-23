import { UrlController } from "controller";
import { Router } from "express";

const urlRouter = Router();

urlRouter.get("/short", UrlController.genShortenUrl);
urlRouter.get("/origin", UrlController.getOriginUrl);
urlRouter.get("/", UrlController.getUrls);
urlRouter.post("/", UrlController.genShortenUrl);
urlRouter.patch("/", UrlController.updateShortenUrl);

export default urlRouter;
