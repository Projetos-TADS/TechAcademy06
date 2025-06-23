import { ActorCreate, ActorReturn, ActorUpdate, Pagination, PaginationParams } from "../interfaces";
import { actorReadSchema, actorReturnSchema } from "../schemas";
import { ActorModel } from "../models/Actor.model";
import { Op } from "sequelize";

const getAllActors = async (
  { page, perPage, prevPage, nextPage, order, sort }: PaginationParams,
  name?: string
): Promise<Pagination> => {
  const whereClause = name ? { name: { [Op.like]: `%${name.toLowerCase()}%` } } : {};

  const { rows: actors, count }: { rows: ActorModel[]; count: number } =
    await ActorModel.findAndCountAll({
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
    data: actorReadSchema.parse(actors),
  };
};

const createActor = async (payLoad: ActorCreate): Promise<ActorReturn> => {
  const actor = await ActorModel.create({
    ...payLoad,
    birthDate: payLoad.birthDate ?? null,
  });

  return actorReturnSchema.parse(actor);
};

const updateActor = async (actor: ActorModel, payLoad: ActorUpdate): Promise<ActorReturn> => {
  Object.assign(actor, payLoad);
  await actor.save();

  return actorReturnSchema.parse(actor);
};

const deleteActor = async (actor: ActorModel): Promise<void> => {
  await actor!.destroy();
};

export default { getAllActors, createActor, deleteActor, updateActor };
