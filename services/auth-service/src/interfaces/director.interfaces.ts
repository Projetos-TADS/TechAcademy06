import { z } from "zod";
import { Optional } from "sequelize";
import { directorCreateSchema, directorReadSchema, directorReturnSchema } from "../schemas";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DirectorCreate = z.infer<typeof directorCreateSchema>;
type DirectorRead = z.infer<typeof directorReadSchema>;
type DirectorReturn = z.infer<typeof directorReturnSchema>;
type DirectorUpdate = DeepPartial<DirectorCreate>;

interface DirectorAttributes {
  directorId: string;
  name: string;
  birthDate: string | null;
  nationality: string;
}

interface DirectorCreationAttributes
  extends Optional<DirectorAttributes, "directorId" | "birthDate"> {}

export {
  DirectorCreate,
  DirectorRead,
  DirectorReturn,
  DirectorAttributes,
  DirectorCreationAttributes,
  DirectorUpdate,
};
