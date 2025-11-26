import { Request, Response } from "express";
import { movieServices } from "../services";
import { MovieReturn, MovieUpdate, Pagination } from "../interfaces";
import { movieCompleteReturnSchema } from "../schemas";
import { MovieModel } from "../models";

const getAllMovies = async (request: Request, response: Response): Promise<Response> => {
  const title: string | undefined =
    typeof request.query.title === "string" ? request.query.title : undefined;

  const paginationMovies: Pagination = await movieServices.getAllMovies(
    response.locals.pagination,
    title
  );

  return response.status(200).json(paginationMovies);
};

const getMovieById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(movieCompleteReturnSchema.parse(response.locals.movie));
};

const createMovie = async (request: Request, response: Response): Promise<Response> => {
  const files = request.files as Express.Multer.File[];
  const movie: MovieReturn = await movieServices.createMovie(request.body, files);

  return response.status(201).json(movie);
};

const updateMovie = async (request: Request, response: Response): Promise<Response> => {
  const payLoad: MovieUpdate = request.body;
  const foundMovie: MovieModel = response.locals.movie;
  const files = request.files as Express.Multer.File[];

  const movie: MovieReturn = await movieServices.updateMovie(foundMovie, payLoad, files);

  return response.status(200).json(movie);
};

const deleteMovie = async (request: Request, response: Response): Promise<Response> => {
  await movieServices.deleteMovie(response.locals.movie);

  return response.status(204).json();
};

export default { getAllMovies, createMovie, getMovieById, deleteMovie, updateMovie };
