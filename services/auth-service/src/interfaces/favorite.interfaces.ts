import { z } from "zod";
import { Optional } from "sequelize";
import {
  favoriteCompleteReadSchema,
  favoriteReadSchema,
  favoriteReturnSchema,
} from "../schemas/favorite.schemas";

type FavoriteRead = z.infer<typeof favoriteReadSchema>;
type FavoriteReturn = z.infer<typeof favoriteReturnSchema>;

interface FavoriteMovieAttributes {
  favoriteMovieId: string;
  userId: string;
  movieId: string;
  addedDate: Date;
}

interface FavoriteMovieCreationAttributes
  extends Optional<FavoriteMovieAttributes, "favoriteMovieId" | "addedDate"> {}

type FavoriteCompleteRead = z.infer<typeof favoriteCompleteReadSchema>;

export {
  FavoriteRead,
  FavoriteReturn,
  FavoriteMovieAttributes,
  FavoriteMovieCreationAttributes,
  FavoriteCompleteRead,
};
