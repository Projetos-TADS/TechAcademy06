import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { UserModel } from "../models";

const verifyUserIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string | undefined = request.params.userId;

  const user: UserModel | null = await UserModel.findByPk(userId);

  if (!user) throw new AppError("User not found", 404);

  response.locals = { ...response.locals, user };

  return next();
};

export default verifyUserIdExists;
