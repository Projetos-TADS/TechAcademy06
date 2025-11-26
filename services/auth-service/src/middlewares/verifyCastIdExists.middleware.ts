import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { CastModel } from "../models";

const verifyCastIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const castId: string | undefined = request.params.castId;

  const cast: CastModel | null = await CastModel.findByPk(castId);

  if (!cast) throw new AppError("Cast not found", 404);

  response.locals = { ...response.locals, cast };

  return next();
};

export default verifyCastIdExists;
