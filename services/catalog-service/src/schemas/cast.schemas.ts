import { z } from "zod";
import { movieCompleteReturnSchema } from "./movie.schemas";

const castSchema = z.object({
  castId: z.string().uuid(),
  movieId: z.string().uuid(),
  actorId: z.string().uuid(),
  addedDate: z.date(),
});

const castReturnSchema = castSchema;

const castCompleteReturnSchema = castSchema.extend({
  movie: movieCompleteReturnSchema,
});

export { castSchema, castReturnSchema, castCompleteReturnSchema };
