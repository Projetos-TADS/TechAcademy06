import { z } from "zod";
import {
  userCompleteReturnSchema,
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas";
import { Optional } from "sequelize";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type UserCreate = z.infer<typeof userCreateSchema>;
type UserUpdate = DeepPartial<typeof userUpdateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserCompleteReturn = z.infer<typeof userCompleteReturnSchema>;

interface UserAttributes {
  userId: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  admin: boolean;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "userId" | "createdAt" | "updatedAt" | "deletedAt"> {}

export {
  UserCreate,
  UserUpdate,
  UserRead,
  UserReturn,
  UserAttributes,
  UserCreationAttributes,
  UserCompleteReturn,
};
