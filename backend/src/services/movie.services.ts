import { Op } from "sequelize";
import { MovieCreate, MovieReturn, MovieUpdate, Pagination, PaginationParams } from "../interfaces";
import { MovieModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";
import { movieCompleteReturnSchema } from "../schemas";

const getMovieRelations = () => {
  return [
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
  ];
};

const getMovieByIdWithRelations = async (movieId: string): Promise<MovieModel | null> => {
  return await MovieModel.findByPk(movieId, {
    include: getMovieRelations(),
  });
};

const getAllMovies = async (
  { page, perPage, prevPage, nextPage, order, sort }: PaginationParams,
  title?: string
): Promise<Pagination> => {
  const whereClause = title ? { title: { [Op.like]: `%${title.toLowerCase()}%` } } : {};

  const { rows: movies, count }: { rows: MovieModel[]; count: number } =
    await MovieModel.findAndCountAll({
      order: [[sort, order]],
      offset: page,
      limit: perPage,
      where: whereClause,
      include: getMovieRelations(),
      distinct: true,
    });

  if (count - page <= perPage) {
    nextPage = null;
  }

  return {
    prevPage,
    nextPage,
    count,
    data: movies,
  };
};

const createMovie = async (payLoad: MovieCreate): Promise<MovieReturn> => {
  const movie: MovieModel = await MovieModel.create(payLoad);
  const newMovie: MovieModel | null = await getMovieByIdWithRelations(movie.movieId);

  return movieCompleteReturnSchema.parse(newMovie);
};

const updateMovie = async (movie: MovieModel, payLoad: MovieUpdate): Promise<MovieReturn> => {
  Object.assign(movie, payLoad);
  await movie.save();
  const newMovie: MovieModel | null = await getMovieByIdWithRelations(movie.movieId);

  return movieCompleteReturnSchema.parse(newMovie);
};

const deleteMovie = async (movie: MovieModel): Promise<void> => {
  await movie!.destroy();
};

export default { getAllMovies, createMovie, deleteMovie, updateMovie, getMovieByIdWithRelations };
