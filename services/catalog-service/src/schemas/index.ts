import {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
  userCompleteReturnSchema,
  userCompleteReadSchema,
} from "./user.schemas";
import {
  movieSchema,
  movieCreateSchema,
  movieUpdateSchema,
  movieReturnSchema,
  movieReadSchema,
  movieCompleteReadSchema,
  movieCompleteReturnSchema,
} from "./movie.schemas";
import { sessionSchema } from "./session.schemas";
import {
  favoriteSchema,
  favoriteReturnSchema,
  favoriteReadSchema,
  favoriteCompleteReadSchema,
} from "./favorite.schemas";
import {
  actorSchema,
  actorCreateSchema,
  actorUpdateSchema,
  actorReturnSchema,
  actorReadSchema,
} from "./actor.schemas";

import {
  directorSchema,
  directorCreateSchema,
  directorUpdateSchema,
  directorReturnSchema,
  directorReadSchema,
} from "./director.schemas";
import { castSchema, castReturnSchema, castCompleteReturnSchema } from "./cast.schemas";
import {
  directorMovieSchema,
  directorMovieReturnSchema,
  directorMovieCompleteReturnSchema,
} from "./directorMovie.schemas";

export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
  userCompleteReturnSchema,
  userCompleteReadSchema,
  sessionSchema,
  movieSchema,
  movieCreateSchema,
  movieUpdateSchema,
  movieReturnSchema,
  movieReadSchema,
  movieCompleteReadSchema,
  movieCompleteReturnSchema,
  favoriteSchema,
  favoriteReturnSchema,
  favoriteReadSchema,
  favoriteCompleteReadSchema,
  actorSchema,
  actorCreateSchema,
  actorUpdateSchema,
  actorReturnSchema,
  actorReadSchema,
  directorSchema,
  directorCreateSchema,
  directorUpdateSchema,
  directorReturnSchema,
  directorReadSchema,
  castSchema,
  castReturnSchema,
  directorMovieSchema,
  directorMovieReturnSchema,
  directorMovieCompleteReturnSchema,
  castCompleteReturnSchema,
};
