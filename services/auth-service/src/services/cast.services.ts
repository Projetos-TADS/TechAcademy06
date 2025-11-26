import { CastModel, MovieModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { CastCompleteReturn } from "../interfaces";
import { castCompleteReturnSchema } from "../schemas";
import { AppError } from "../errors";
import { movieServices } from "../services";

const addActorToMovie = async (
  movie: MovieModel,
  actor: ActorModel
): Promise<CastCompleteReturn> => {
  const castPayload = { movieId: movie.movieId, actorId: actor.actorId };
  const [cast, created] = await CastModel.findOrCreate({
    where: castPayload,
    defaults: castPayload,
  });

  if (!created) throw new AppError("Actor already edded");

  const movieUpdated: MovieModel | null = await movieServices.getMovieByIdWithRelations(
    cast.movieId
  );

  const castWithMovie = {
    ...cast.get({ plain: true }),
    movie: movieUpdated!.get({ plain: true }),
  };

  return castCompleteReturnSchema.parse(castWithMovie);
};

const removeActorFromMovie = async (cast: CastModel): Promise<void> => {
  await cast!.destroy();
};

export default { addActorToMovie, removeActorFromMovie };
