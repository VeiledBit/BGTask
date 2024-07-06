import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 10 }); // Cache for 10 minutes

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cachedData = cache.get("fileData");

  if (cachedData) {
    return res.json(cachedData);
  }

  res.locals.cache = cache;
  next();
};
