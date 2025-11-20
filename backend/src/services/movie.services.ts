import { Op } from "sequelize";
import { MovieCreate, MovieReturn, MovieUpdate, Pagination, PaginationParams } from "../interfaces";
import { MovieModel, MovieImageModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";
import { movieCompleteReturnSchema } from "../schemas";
import AppError from "../errors/App.error";

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
  return movieCompleteReturnSchema.parse(newMovie);
};

const deleteMovie = async (movie: MovieModel): Promise<void> => {
  await movie!.destroy();
};

export default { getAllMovies, createMovie, deleteMovie, updateMovie, getMovieByIdWithRelations };
