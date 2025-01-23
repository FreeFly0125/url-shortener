import { URL_PREFIX } from "consts";
import { Request, Response } from "express";
import { UrlService } from "service";

export const get_urls = async (_req: Request, res: Response) => {
  const urls = await UrlService.get_all();
  return res.status(200).send(urls);
};

export const get_shorten_url = async (req: Request, res: Response) => {
  const result = await UrlService.get_shorten_url(req.query.url as string);
  return result
    ? res.status(302).send({ shortUrl: result.shorten })
    : res.status(404).send({ shortUrl: "" });
};

export const get_origin_url = async (req: Request, res: Response) => {
  const result = await UrlService.get_origin_url(req.query.url as string);
  return result
    ? res.status(302).send({ orgUrl: result.origin })
    : res.status(404).send({ orgUrl: "" });
};

const generate_url = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return `${URL_PREFIX}${result}`;
};

export const gen_shorten_url = async (req: Request, res: Response) => {
  const { orgUrl }: { orgUrl: string } = req.body;
  const shortUrl = generate_url(6);
  const result = await UrlService.new_url_set(orgUrl, shortUrl);
  return result
    ? res.status(200).send({ shortUrl })
    : res.status(500).send({ shortUrl: "" });
};
