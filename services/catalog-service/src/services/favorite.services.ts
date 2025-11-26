import { FavoriteReturn, UserCompleteReturn } from "../interfaces";
import { MovieModel, UserModel } from "../models";
import { FavoriteMovieModel } from "../models/FavoriteMovie.model";
import { favoriteReturnSchema } from "../schemas/favorite.schemas";
import { AppError } from "../errors";
import { userCompleteReturnSchema } from "../schemas";

const getAllFavoritesFromUser = async (user: UserModel): Promise<UserCompleteReturn> => {
  const userFavorites: UserModel | null = await UserModel.findByPk(user.userId, {
    include: [
      {
        model: FavoriteMovieModel,
        as: "favoriteList",
        attributes: ["favoriteMovieId", "movieId", "addedDate"],
      },
    ],
  });
  return userCompleteReturnSchema.parse(userFavorites);
};

const createFavorite = async (movie: MovieModel, user: UserModel): Promise<FavoriteReturn> => {
  const favoritePayload = { movieId: movie.movieId, userId: user.userId };
  const [userFavorite, created] = await FavoriteMovieModel.findOrCreate({
    where: favoritePayload,
    defaults: favoritePayload,
  });

  if (!created) throw new AppError("Favorite already exists");

  return favoriteReturnSchema.parse(userFavorite);
};

const deleteFavorite = async (favorite: FavoriteMovieModel): Promise<void> => {
  await favorite!.destroy();
};

export default { getAllFavoritesFromUser, createFavorite, deleteFavorite };
