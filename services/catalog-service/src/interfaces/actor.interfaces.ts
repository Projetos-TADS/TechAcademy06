import { z } from "zod";
import { Optional } from "sequelize";
import { actorCreateSchema, actorReadSchema, actorReturnSchema } from "../schemas";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ActorCreate = z.infer<typeof actorCreateSchema>;
type ActorRead = z.infer<typeof actorReadSchema>;
type ActorReturn = z.infer<typeof actorReturnSchema>;
type ActorUpdate = DeepPartial<ActorCreate>;

interface ActorAttributes {
  actorId: string;
  name: string;
  birthDate: string | null;
  nationality: string;
}

interface ActorCreationAttributes extends Optional<ActorAttributes, "actorId" | "birthDate"> {}

export {
  ActorCreate,
  ActorRead,
  ActorReturn,
  ActorAttributes,
  ActorCreationAttributes,
  ActorUpdate,
};
