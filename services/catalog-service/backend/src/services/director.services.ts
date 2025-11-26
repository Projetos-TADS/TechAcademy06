import { Op } from "sequelize";
import {
  DirectorCreate,
  DirectorReturn,
  DirectorUpdate,
  Pagination,
  PaginationParams,
} from "../interfaces";
import { DirectorModel } from "../models/Director.model";
import { directorReadSchema, directorReturnSchema } from "../schemas";

const getAllDirectors = async (
  { page, perPage, prevPage, nextPage, order, sort }: PaginationParams,
  name?: string
): Promise<Pagination> => {
  const whereClause = name ? { name: { [Op.like]: `%${name.toLowerCase()}%` } } : {};

  const { rows: directors, count }: { rows: DirectorModel[]; count: number } =
    await DirectorModel.findAndCountAll({
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
    data: directorReadSchema.parse(directors),
  };
};

const createDirector = async (payLoad: DirectorCreate): Promise<DirectorReturn> => {
  const director = await DirectorModel.create({
    ...payLoad,
    birthDate: payLoad.birthDate ?? null,
  });

  return directorReturnSchema.parse(director);
};

const updateDirector = async (
  director: DirectorModel,
  payLoad: DirectorUpdate
): Promise<DirectorReturn> => {
  Object.assign(director, payLoad);
  await director.save();

  return directorReturnSchema.parse(director);
};

const deleteDirector = async (director: DirectorModel): Promise<void> => {
  await director!.destroy();
};

export default { getAllDirectors, createDirector, deleteDirector, updateDirector };
