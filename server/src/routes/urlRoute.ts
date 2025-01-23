import { UrlController } from "controller";
import { Router } from "express";

const urlRouter = Router();

urlRouter.get("/short", UrlController.get_shorten_url);
urlRouter.get("/origin", UrlController.get_origin_url);
urlRouter.get("/", UrlController.get_urls);
urlRouter.post("/", UrlController.gen_shorten_url);

export default urlRouter;
