import { z } from "zod";

const favoriteSchema = z.object({
  favoriteMovieId: z.string().uuid(),
  movieId: z.string().uuid(),
  userId: z.string().uuid(),
  addedDate: z.date(),
});

const favoriteReturnSchema = favoriteSchema;

const favoriteReadSchema = favoriteReturnSchema.array();

const favoriteCompleteReadSchema = favoriteSchema
  .omit({
    userId: true,
  })
  .array();

export { favoriteSchema, favoriteReturnSchema, favoriteReadSchema, favoriteCompleteReadSchema };
