import { Request, Response } from "express";
import { DirectorReturn, DirectorUpdate, Pagination } from "../interfaces";
import { directorServices } from "../services";
import { DirectorModel } from "../models/Director.model";
import { directorReturnSchema } from "../schemas";

const getAllDirectors = async (request: Request, response: Response): Promise<Response> => {
  const name: string | undefined =
    typeof request.query.name === "string" ? request.query.name : undefined;

  const paginationDirectors: Pagination = await directorServices.getAllDirectors(
    response.locals.pagination,
    name
  );

  return response.status(200).json(paginationDirectors);
};

const getDirectorById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(directorReturnSchema.parse(response.locals.director));
};

const createDirector = async (request: Request, response: Response): Promise<Response> => {
  const director: DirectorReturn = await directorServices.createDirector(request.body);

  return response.status(201).json(director);
};

const updateDirector = async (request: Request, response: Response): Promise<Response> => {
  const payLoad: DirectorUpdate = request.body;
  const foundDirector: DirectorModel = response.locals.director;

  const director: DirectorReturn = await directorServices.updateDirector(foundDirector, payLoad);

  return response.status(200).json(director);
};

const deleteDirector = async (request: Request, response: Response): Promise<Response> => {
  await directorServices.deleteDirector(response.locals.director);

  return response.status(204).json();
};

export default {
  getAllDirectors,
  getDirectorById,
  createDirector,
  deleteDirector,
  updateDirector,
};
