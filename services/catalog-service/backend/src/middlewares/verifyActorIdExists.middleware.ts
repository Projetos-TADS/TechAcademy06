import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { ActorModel } from "../models/Actor.model";

const verifyActorIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const actorId: string | undefined = request.params.actorId;

  const actor: ActorModel | null = await ActorModel.findByPk(actorId);

  if (!actor) throw new AppError("Actor not found", 404);

  response.locals = { ...response.locals, actor };

  return next();
};

export default verifyActorIdExists;
