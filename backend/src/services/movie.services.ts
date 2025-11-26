import { Op } from "sequelize";
import { MovieCreate, MovieReturn, MovieUpdate, Pagination, PaginationParams } from "../interfaces";
import { MovieModel, MovieImageModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";
import { movieCompleteReturnSchema } from "../schemas";
import AppError from "../errors/App.error";
import redisClient, { redisPub } from "../config/redis";
import Logger from "../config/logger";

const CACHE_TTL = 300;

const clearMovieCache = async (movieId?: string) => {
  if (movieId) {
    await redisClient.del(`movie:${movieId}`);
  }

  const keys = await redisClient.keys("movies:list:*");
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};

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
    {
      model: MovieImageModel,
      as: "images",
      attributes: ["id", "filename", "path"],
    },
  ];
};

const getMovieByIdWithRelations = async (movieId: string): Promise<MovieModel | null> => {
  const cacheKey = `movie:${movieId}`;
  const cachedMovie = await redisClient.get(cacheKey);

  if (cachedMovie) {
    const parsedMovie = JSON.parse(cachedMovie);
    return MovieModel.build(parsedMovie, { isNewRecord: false, include: getMovieRelations() });
  }

  const movie = await MovieModel.findByPk(movieId, {
    include: getMovieRelations(),
  });

  if (movie) {
    await redisClient.setex(cacheKey, CACHE_TTL, JSON.stringify(movie));
  }

  return movie;
};

const getAllMovies = async (
  { page, perPage, prevPage, nextPage, order, sort }: PaginationParams,
  title?: string
): Promise<Pagination> => {
  const cacheKey = `movies:list:${page}:${perPage}:${sort}:${order}:${title || "all"}`;
  const cachedList = await redisClient.get(cacheKey);

  if (cachedList) {
    return JSON.parse(cachedList);
  }

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

  const result = {
    prevPage,
    nextPage,
    count,
    data: movies,
  };

  await redisClient.setex(cacheKey, CACHE_TTL, JSON.stringify(result));

  return result;
};

const createMovie = async (
  payLoad: MovieCreate,
  files: Express.Multer.File[]
): Promise<MovieReturn> => {
  if (files && files.length > 0) {
    for (const file of files) {
      const existingImage = await MovieImageModel.findOne({
        where: { filename: file.filename },
      });

      if (existingImage) {
        throw new AppError(`Image with name '${file.filename}' already exists`, 409);
      }
    }
  }

  const movie: MovieModel = await MovieModel.create({
    ...payLoad,
    urlImage: files && files.length > 0 ? files[0].path : "",
  });

  if (files && files.length > 0) {
    const imagesData = files.map((file) => ({
      movieId: movie.movieId,
      filename: file.filename,
      path: file.path,
    }));

    await MovieImageModel.bulkCreate(imagesData);
  }

  const newMovie: MovieModel | null = await getMovieByIdWithRelations(movie.movieId);

  await clearMovieCache();

  Logger.info(`Publishing event to movie-channel for movie: ${movie.title}`);
  await redisPub.publish(
    "movie-channel",
    JSON.stringify({ event: "MOVIE_CREATED", title: payLoad.title, movieId: movie.movieId })
  );
  Logger.info("Event published successfully.");

  return movieCompleteReturnSchema.parse(newMovie);
};

const updateMovie = async (
  movie: MovieModel,
  payLoad: MovieUpdate,
  files?: Express.Multer.File[]
): Promise<MovieReturn> => {
  Object.assign(movie, payLoad);
  await movie.save();

  if (files && files.length > 0) {
    for (const file of files) {
      const existingImage = await MovieImageModel.findOne({
        where: { filename: file.filename },
      });
      if (existingImage) {
        throw new AppError(`Image with name '${file.filename}' already exists`, 409);
      }
    }

    const imagesData = files.map((file) => ({
      movieId: movie.movieId,
      filename: file.filename,
      path: file.path,
    }));
    await MovieImageModel.bulkCreate(imagesData);
  }

  const newMovie: MovieModel | null = await getMovieByIdWithRelations(movie.movieId);

  await clearMovieCache(movie.movieId);

  return movieCompleteReturnSchema.parse(newMovie);
};

const deleteMovie = async (movie: MovieModel): Promise<void> => {
  await movie!.destroy();
  await clearMovieCache(movie.movieId);
};

export default { getAllMovies, createMovie, deleteMovie, updateMovie, getMovieByIdWithRelations };
