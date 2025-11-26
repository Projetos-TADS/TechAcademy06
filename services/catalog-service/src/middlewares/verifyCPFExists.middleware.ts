import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { FindOptions } from "sequelize";
import { UserModel } from "../models";

const verifyCPFExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userCPF: string | undefined = request.body.cpf;

  const findOptions: FindOptions = {
    where: {
      cpf: userCPF,
    },
    paranoid: false,
  };

  const existingUser: UserModel | null = await UserModel.findOne(findOptions);

  if (existingUser) throw new AppError("This CPF is already in use by another user.", 409);

  return next();
};

export default verifyCPFExists;
