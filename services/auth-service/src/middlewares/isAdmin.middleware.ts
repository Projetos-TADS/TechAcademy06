import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const isAdmin = (request: Request, response: Response, next: NextFunction): void => {
  const admin: boolean = response.locals.decoded.admin;
  if (!admin) throw new AppError("Insufficient permissions", 403);

  return next();
};

export default isAdmin;
