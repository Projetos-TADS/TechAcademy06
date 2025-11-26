import { CastModel, DirectorMovieModel, MovieModel } from "../models";
import { DirectorMovieCompleteReturn } from "../interfaces";
import { AppError } from "../errors";
import { directorMovieCompleteReturnSchema } from "../schemas";
import { DirectorModel } from "../models/Director.model";
import movieServices from "./movie.services";

const addDirectorToMovie = async (
  movie: MovieModel,
  director: DirectorModel
): Promise<DirectorMovieCompleteReturn> => {
  const directorMoviePayload = {
    movieId: movie.movieId,
    directorId: director.directorId,
  };
  const [directorMovie, created] = await DirectorMovieModel.findOrCreate({
    where: directorMoviePayload,
    defaults: directorMoviePayload,
  });

  if (!created) throw new AppError("Director already edded");

  const movieUpdated: MovieModel | null = await movieServices.getMovieByIdWithRelations(
    movie.movieId
  );

  const directorWithMovie = {
    ...directorMovie.get({ plain: true }),
    movie: movieUpdated!.get({ plain: true }),
  };

  return directorMovieCompleteReturnSchema.parse(directorWithMovie);
};

const removeDirectorFromMovie = async (directorMovie: CastModel): Promise<void> => {
  await directorMovie!.destroy();
};

export default { addDirectorToMovie, removeDirectorFromMovie };
