import { Request, Response } from "express";
import { UserModel } from "../models";
import { userServices } from "../services";
import { Pagination, UserUpdate } from "../interfaces";
import { UserReturn } from "../interfaces/user.interfaces";
import { userReturnSchema } from "../schemas";

const getAllUsers = async (request: Request, response: Response): Promise<Response> => {
  const name: string | undefined =
    typeof request.query.name === "string" ? request.query.name : undefined;

  const email: string | undefined =
    typeof request.query.email === "string" ? request.query.email : undefined;

  const paginationUsers: Pagination = await userServices.getAllUsers(
    response.locals.pagination,
    name,
    email
  );

  return response.status(200).json(paginationUsers);
};

const getUserById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(userReturnSchema.parse(response.locals.user));
};

const createUser = async (request: Request, response: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createUser(request.body);

  return response.status(201).json(user);
};

const updateUser = async (request: Request, response: Response): Promise<Response> => {
  const payLoad: UserUpdate = request.body;
  const foundUser: UserModel = response.locals.user;

  const user: UserReturn = await userServices.updateUser(foundUser, payLoad);

  return response.status(200).json(user);
};

const deleteUser = async (request: Request, response: Response): Promise<Response> => {
  await userServices.deleteUser(response.locals.user);

  return response.status(204).json();
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
