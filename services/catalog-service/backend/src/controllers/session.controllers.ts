import { Request, Response } from "express";
import { SessionReturn } from "../interfaces";
import { sessionServices } from "../services";
import { sessionReturnSchema } from "../schemas/session.schemas";

const createSession = async (request: Request, response: Response): Promise<Response> => {
  const session: SessionReturn = await sessionServices.createSession(request.body);

  return response.status(200).json(sessionReturnSchema.parse(session));
};

export default { createSession };
