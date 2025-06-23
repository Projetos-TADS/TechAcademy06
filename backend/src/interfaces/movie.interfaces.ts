import { z } from "zod";
import {
  movieCompleteReadSchema,
  movieCreateSchema,
  movieReadSchema,
  movieReturnSchema,
} from "../schemas";
import { Optional } from "sequelize";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type MovieCreate = z.infer<typeof movieCreateSchema>;
type MovieUpdate = DeepPartial<MovieCreate>;
type MovieRead = z.infer<typeof movieReadSchema>;
type MovieCompleteReadSchema = z.infer<typeof movieCompleteReadSchema>;
type MovieReturn = z.infer<typeof movieReturnSchema>;

interface MovieAttributes {
  movieId: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number;
  rating: number;
  urlImage: string;
  createdAt: Date;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, "movieId" | "createdAt"> {}

export {
  MovieCreate,
  MovieUpdate,
  MovieRead,
  MovieReturn,
  MovieAttributes,
  MovieCreationAttributes,
  MovieCompleteReadSchema,
};
