import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { FavoriteMovieModel, MovieModel, UserModel } from "../models";

const verifyFavoriteIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const favoriteId: string | undefined = request.params.favoriteId;

  const favorite: FavoriteMovieModel | null = await FavoriteMovieModel.findByPk(favoriteId, {
    include: [
      {
        model: MovieModel,
        as: "movie",
        attributes: [
          "movieId",
          "title",
          "description",
          "releaseYear",
          "duration",
          "rating",
          "urlImage",
        ],
      },
      {
        model: UserModel,
        as: "user",
        attributes: ["userId", "name", "email", "admin"],
      },
    ],
  });

  if (!favorite) throw new AppError("Favorite not found", 404);

  response.locals = { ...response.locals, favorite };

  return next();
};

export default verifyFavoriteIdExists;
