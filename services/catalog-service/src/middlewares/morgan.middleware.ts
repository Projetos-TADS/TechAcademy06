import { Request, Response, NextFunction } from "express";
import Logger from "../config/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    const message = `${method} ${url} ${status} - ${duration}ms`;

    if (status >= 500) {
      Logger.error(message);
    } else if (status >= 400) {
      Logger.warn(message);
    } else {
      Logger.http(message);
    }
  });

  next();
};

export default requestLogger;
