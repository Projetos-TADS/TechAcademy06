import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { MovieModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";

const verifyMovieIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  let movieId: string | undefined = request.params.movieId;

  const movie: MovieModel | null = await MovieModel.findByPk(movieId, {
    include: [
      {
        model: ActorModel,
        as: "actors",
        attributes: ["actorId", "name", "birthDate", "nationality"],
      },
      {
        model: DirectorModel,
        as: "directors",
        attributes: ["directorId", "name", "birthDate", "nationality"],
      },
    ],
  });

  if (!movie) throw new AppError("Movie not found", 404);

  response.locals = { ...response.locals, movie };

  return next();
};

export default verifyMovieIdExists;
