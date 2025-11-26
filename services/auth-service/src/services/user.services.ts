import { Pagination, PaginationParams, UserCreate, UserUpdate } from "../interfaces";
import { UserModel } from "../models";
import { userReadSchema, userReturnSchema } from "../schemas";
import { UserReturn } from "../interfaces/user.interfaces";
import { Op } from "sequelize";

const getAllUsers = async (
  { page, perPage, prevPage, nextPage, order, sort }: PaginationParams,
  name?: string,
  email?: string
): Promise<Pagination> => {
  const whereClause = {
    ...(name ? { name: { [Op.like]: `%${name.toLowerCase()}%` } } : {}),
    ...(email ? { email: { [Op.like]: `%${email.toLowerCase()}%` } } : {}),
  };

  const { rows: users, count }: { rows: UserModel[]; count: number } =
    await UserModel.findAndCountAll({
      order: [[sort, order]],
      offset: page,
      limit: perPage,
      where: whereClause,
      distinct: true,
    });

  if (count - page <= perPage) {
    nextPage = null;
  }

  return {
    prevPage,
    nextPage,
    count,
    data: userReadSchema.parse(users),
  };
};

const createUser = async (payLoad: UserCreate): Promise<UserReturn> => {
  const user: UserModel = await UserModel.create(payLoad);

  return userReturnSchema.parse(user);
};

const updateUser = async (user: UserModel, payLoad: UserUpdate): Promise<UserReturn> => {
  Object.assign(user, payLoad);
  await user.save();

  return userReturnSchema.parse(user);
};

const deleteUser = async (user: UserModel): Promise<void> => {
  await user!.destroy();
};

export default { getAllUsers, updateUser, deleteUser, createUser };
