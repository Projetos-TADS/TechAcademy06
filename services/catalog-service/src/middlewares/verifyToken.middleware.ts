import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

const verifyToken = (request: Request, response: Response, next: NextFunction): void => {
  const authorization: string | undefined = request.headers.authorization;
  if (!authorization) throw new AppError("Missing bearer token", 401);

  const [_bearer, token]: Array<string> = authorization.split(" ");

  response.locals = {
    ...response.locals,
    decoded: verify(token, process.env.SECRET_KEY!),
  };

  return next();
};

export default verifyToken;
