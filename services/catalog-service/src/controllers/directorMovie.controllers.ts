import { Request, Response } from "express";
import { DirectorMovieCompleteReturn } from "../interfaces";
import { directorMovieServices } from "../services";

const addDirectorToMovie = async (request: Request, response: Response): Promise<Response> => {
  const directorWithMovie: DirectorMovieCompleteReturn =
    await directorMovieServices.addDirectorToMovie(response.locals.movie, response.locals.director);

  return response.status(201).json(directorWithMovie);
};

const removeDirectorFromMovie = async (request: Request, response: Response): Promise<Response> => {
  await directorMovieServices.removeDirectorFromMovie(response.locals.directorMovie);

  return response.status(204).json();
};

export default {
  addDirectorToMovie,
  removeDirectorFromMovie,
};
