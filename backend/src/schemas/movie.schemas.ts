import { z } from "zod";
import { actorReadSchema } from "./actor.schemas";
import { directorReadSchema } from "./director.schemas";

const movieSchema = z.object({
  movieId: z.string().uuid(),
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  releaseYear: z
    .number()
    .int()
    .min(1888, "Release year must be after 1888")
    .max(new Date().getFullYear(), "Release year can't be in the future"),
  duration: z.number().int().min(1, "Duration must be greater than 0"),
  rating: z
    .number()
    .min(0, "Rating must be 0 or more")
    .max(5.0, "Rating must be less than or equal to 5"),
  urlImage: z
    .string()
    .url()
    .min(1, "Url Image is required")
    .max(255, "Url Image must be less than 255 characters"),
  createdAt: z.date(),
});

const movieCreateSchema = movieSchema.omit({
  movieId: true,
  createdAt: true,
});

const movieReturnSchema = movieSchema;

const movieReadSchema = movieReturnSchema.array();

const movieUpdateSchema = movieCreateSchema.partial();

const movieCompleteReturnSchema = movieSchema.extend({
  actors: actorReadSchema,
  directors: directorReadSchema,
});

const movieCompleteReadSchema = movieCompleteReturnSchema.array();

export {
  movieSchema,
  movieCreateSchema,
  movieUpdateSchema,
  movieReturnSchema,
  movieReadSchema,
  movieCompleteReadSchema,
  movieCompleteReturnSchema,
};
