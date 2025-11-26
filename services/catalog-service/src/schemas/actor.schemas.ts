import { z } from "zod";
import { AppError } from "../errors";
import { validateDate } from "../utils";

const actorSchema = z.object({
  actorId: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  birthDate: z.union([
    z.string().refine((value) => {
      const result = validateDate(value);
      if (!result.isValid) throw new AppError(result.message!);
      return true;
    }),
    z.null(),
  ]),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(100, "Nationality must be less than 100 characters"),
});

const actorCreateSchema = actorSchema.omit({ actorId: true }).extend({
  birthDate: z
    .string()
    .refine((value) => {
      const result = validateDate(value);
      if (!result.isValid) throw new AppError(result.message!);
      return true;
    })
    .nullable()
    .optional(),
});

const actorReturnSchema = actorSchema;

const actorReadSchema = actorReturnSchema.array();

const actorUpdateSchema = actorCreateSchema.partial();

export { actorSchema, actorCreateSchema, actorUpdateSchema, actorReturnSchema, actorReadSchema };
