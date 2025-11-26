import { z } from "zod";
import { actorReadSchema } from "./actor.schemas";
import { directorReadSchema } from "./director.schemas";

const movieSchema = z.object({
  movieId: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  releaseYear: z.coerce.number().int().min(1888).max(new Date().getFullYear()),
  duration: z.coerce.number().int().min(1),
  rating: z.coerce.number().min(0).max(5.0),
  urlImage: z.string().max(255).optional(),
  createdAt: z.date(),
});

const movieCreateSchema = movieSchema.omit({
  movieId: true,
  createdAt: true,
  urlImage: true,
});

const movieReturnSchema = movieSchema;

const movieReadSchema = movieReturnSchema.array();

const movieUpdateSchema = movieCreateSchema.partial();

const movieCompleteReturnSchema = movieSchema.extend({
  actors: actorReadSchema,
  directors: directorReadSchema,
  images: z
    .array(
      z.object({
        id: z.number(),
        filename: z.string(),
        path: z.string(),
      })
    )
    .optional(),
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
