import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { DirectorMovieModel } from "../models";

const verifyDirectorMovieIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const directorMovieId: string | undefined = request.params.directorMovieId;

  const directorMovie: DirectorMovieModel | null = await DirectorMovieModel.findByPk(
    directorMovieId
  );

  if (!directorMovie) throw new AppError("DirectorMovie not found", 404);

  response.locals = { ...response.locals, directorMovie };

  return next();
};

export default verifyDirectorMovieIdExists;
