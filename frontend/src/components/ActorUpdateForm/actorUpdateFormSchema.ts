import { z } from "zod";

export const editablePropertiesSchema = z.object({
  name: z
    .string()
    .max(100, "Name must be less than 100 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "Name is required",
    })
    .optional(),
  birthDate: z
    .string()
    .max(100, "Birth Date must be less than 100 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "Birth Date is required",
    })
    .optional(),
  nationality: z
    .string()
    .max(100, "Nationality must be less than 100 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "Nationality is required",
    })
    .optional(),
});

export const actorUpdateFormSchema = editablePropertiesSchema
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined && value !== ""), {
    message: "At least one field must be filled",
  });

export type TActorUpdateFormValues = z.infer<typeof actorUpdateFormSchema>;
