import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { FindOptions } from "sequelize";
import { Op } from "sequelize";
import { UserModel } from "../models";

const verifyEmailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const email: string | undefined = request.body.email;
  if (!email) return next();
  if (response.locals.user && response.locals.user.email === email) return next();

  const findOptions: FindOptions = {
    where: {
      email,
      deletedAt: {
        [Op.is]: null,
      },
    },
  };

  const existingUser: UserModel | null = await UserModel.findOne(findOptions);

  if (existingUser) throw new AppError("This email is already in use by another active user.", 409);

  return next();
};

export default verifyEmailExists;
