import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { DirectorModel } from "../models/Director.model";

const verifyDirectorIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const directorId: string | undefined = request.params.directorId;

  const director: DirectorModel | null = await DirectorModel.findByPk(directorId);

  if (!director) throw new AppError("Director not found", 404);

  response.locals = { ...response.locals, director };

  return next();
};

export default verifyDirectorIdExists;
