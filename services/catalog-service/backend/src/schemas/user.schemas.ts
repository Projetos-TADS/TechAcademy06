import { z } from "zod";
import { favoriteCompleteReadSchema } from "./favorite.schemas";
import { cpf } from "cpf-cnpj-validator";

const userSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid e-mail format")
    .max(100, "E-mail must be less than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  cpf: z
    .string()
    .transform((value: string): string => value.replace(/[\.\-]/g, ""))
    .refine((value) => cpf.isValid(value), {
      message: "Invalid CPF",
    }),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const userCreateSchema = userSchema.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userReturnSchema = userSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema
  .omit({
    cpf: true,
  })
  .partial();

const userCompleteReturnSchema = userReturnSchema.extend({
  favoriteList: favoriteCompleteReadSchema,
});

const userCompleteReadSchema = userCompleteReturnSchema.array();

export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
  userCompleteReturnSchema,
  userCompleteReadSchema,
};
