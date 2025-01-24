import { URL_PREFIX } from "consts";
import { Request, Response } from "express";
import { UrlService } from "service";

export const getUrls = async (req: Request, res: Response) => {
  const urls = await UrlService.getAll(req.query.username as string);
  return res.status(200).send(urls);
};

export const getShortenUrl = async (req: Request, res: Response) => {
  const result = await UrlService.getShorten(
    req.query.url as string,
    req.query.username as string
  );
  return result
    ? res.status(302).send({ shortUrl: result.shorten })
    : res.status(404).send({ shortUrl: "" });
};

export const getOriginUrl = async (req: Request, res: Response) => {
  const result = await UrlService.getOrigin(
    req.query.url as string,
    req.query.username as string
  );
  return result
    ? res.status(302).send({ orgUrl: result.origin })
    : res.status(404).send({ orgUrl: "" });
};

const generateUrl = (length: number): string => {
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

export const genShortenUrl = async (req: Request, res: Response) => {
  const { orgUrl }: { orgUrl: string } = req.body;

  const record = await UrlService.getShorten(
    orgUrl,
    req.query.username as string
  );
  if (record) return res.status(409).send({ shortUrl: record.shorten });

  const shortUrl = generateUrl(6);
  const result = await UrlService.newUrlSet(
    orgUrl,
    shortUrl,
    req.query.username as string
  );
  return result
    ? res.status(200).send({ shortUrl })
    : res.status(500).send({ shortUrl: "" });
};

export const updateShortenUrl = async (req: Request, res: Response) => {
  const { orgUrl, newUrl }: { orgUrl: string; newUrl: string } = req.body;
  const record = await UrlService.getShorten(
    orgUrl,
    req.query.username as string
  );
  if (!record) {
    return res.status(404).send({ shortUrl: "" });
  }
  const result = await UrlService.updateUrl(
    record.id,
    newUrl,
    req.query.username as string
  );
  return result
    ? res.status(200).send({ shortUrl: newUrl })
    : res.status(500).send({ shortUrl: "" });
};

export const deleteShortenUrl = async (req: Request, res: Response) => {
  const { id } = req.body;
  const result = await UrlService.deleteUrl(id);
  return result
    ? res.status(200).send({ success: true })
    : res.status(500).send({ success: false });
};
