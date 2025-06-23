import { z } from "zod";

const editablePropertiesSchema = z.object({
  name: z
    .string()
    .max(100, "Name must be less than 100 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "Name is required",
    }),
  email: z
    .string()
    .max(100, "E-mail must be less than 100 characters")
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: "Invalid e-mail format",
    }),
  password: z
    .string()
    .max(100, "Password must be less than 100 characters")
    .refine((value) => !value || value.length >= 6, {
      message: "Password must be at least 6 characters",
    }),
  confirmPassword: z.string(),
});

export const userUpdateSchema = editablePropertiesSchema
  .partial()
  .refine((data) => data.password === data.confirmPassword || !data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TUserUpdateFormValues = z.infer<typeof userUpdateSchema>;
