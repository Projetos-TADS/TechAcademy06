import { MovieModel } from "../models";
import { ActorRead } from "./actor.interfaces";
import { DirectorRead } from "./director.interfaces";
import { UserRead } from "./user.interfaces";

interface Pagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Array<MovieModel> | ActorRead | DirectorRead | UserRead;
}

interface PaginationParams {
  page: number;
  perPage: number;
  order: string;
  sort: string;
  prevPage: string | null;
  nextPage: string | null;
}

export { Pagination, PaginationParams };
