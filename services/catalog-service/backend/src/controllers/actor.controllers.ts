import { Request, Response } from "express";
import { actorReturnSchema } from "../schemas";
import { ActorReturn, ActorUpdate, Pagination } from "../interfaces";
import { ActorModel } from "../models/Actor.model";
import actorServices from "../services/actor.services";

const getAllActors = async (request: Request, response: Response): Promise<Response> => {
  const name: string | undefined =
    typeof request.query.name === "string" ? request.query.name : undefined;

  const paginationActors: Pagination = await actorServices.getAllActors(
    response.locals.pagination,
    name
  );

  return response.status(200).json(paginationActors);
};

const getActorById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(actorReturnSchema.parse(response.locals.actor));
};

const createActor = async (request: Request, response: Response): Promise<Response> => {
  const actor: ActorReturn = await actorServices.createActor(request.body);

  return response.status(201).json(actor);
};

const updateActor = async (request: Request, response: Response): Promise<Response> => {
  const payLoad: ActorUpdate = request.body;
  const foundActor: ActorModel = response.locals.actor;

  const actor: ActorReturn = await actorServices.updateActor(foundActor, payLoad);

  return response.status(200).json(actor);
};

const deleteActor = async (request: Request, response: Response): Promise<Response> => {
  await actorServices.deleteActor(response.locals.actor);

  return response.status(204).json();
};

export default {
  getAllActors,
  getActorById,
  createActor,
  deleteActor,
  updateActor,
};
