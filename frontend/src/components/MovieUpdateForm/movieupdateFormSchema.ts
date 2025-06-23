import { z } from "zod";

export const editablePropertiesSchema = z.object({
  title: z
    .string()
    .max(100, "Title must be less than 100 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "Title is required",
    })
    .optional(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "Description is required",
    })
    .optional(),
  releaseYear: z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : Number(value)),
    z
      .number()
      .int()
      .max(new Date().getFullYear(), "Release year can't be in the future")
      .refine((value) => !value || value >= 1888, {
        message: "Release year must be 1888 or later",
      })
      .optional()
  ),
  duration: z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : Number(value)),
    z
      .number()
      .int()
      .max(52000, "Duration must be less than 52.000 minutes")
      .refine((value) => !value || value > 0, {
        message: "Duration must be greater than 0 minutes",
      })
      .optional()
  ),
  rating: z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : Number(value)),
    z
      .number()
      .max(5.0, "Rating must be less than or equal to 5")
      .refine((value) => !value || value >= 0, {
        message: "Rating must be 0 or more",
      })
      .optional()
  ),
  urlImage: z
    .string()
    .max(255, "URL Image must be less than 255 characters")
    .refine((value) => !value || value.length >= 1, {
      message: "URL Image is required",
    })
    .optional(),
});

export const movieUpdateFormSchema = editablePropertiesSchema
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined && value !== ""), {
    message: "At least one field must be filled",
  });

export type TMovieUpdateFormValues = z.infer<typeof movieUpdateFormSchema>;
