import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const isAdminOrOwner = (request: Request, response: Response, next: NextFunction): void => {
  const { admin, sub } = response.locals.decoded;
  const userId: string = request.params.userId;
  const favorite = response.locals.favorite;

  if (admin) return next();

  if (favorite && favorite.userId !== sub) throw new AppError("Insufficient permissions", 403);

  if (userId && userId !== sub) throw new AppError("Insufficient permissions", 403);

  return next();
};

export default isAdminOrOwner;
