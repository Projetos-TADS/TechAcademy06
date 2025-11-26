import { Router } from "express";
import middlewares from "../middlewares";
import { upload } from "../middlewares/upload.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas";
import movieControllers from "../controllers/movie.controllers";

const movieRoutes: Router = Router();

movieRoutes.use(middlewares.verifyToken);

movieRoutes.post(
  "",
  middlewares.isAdmin,
  upload.array("images", 5),
  middlewares.validateBody(movieCreateSchema),
  movieControllers.createMovie
);
movieRoutes.get(
  "",
  middlewares.pagination(["title", "releaseYear", "duration", "rating", "createdAt"]),
  movieControllers.getAllMovies
);

movieRoutes.use("/:movieId", middlewares.verifyMovieIdExists);

movieRoutes.get("/:movieId", movieControllers.getMovieById);

movieRoutes.patch(
  "/:movieId",
  middlewares.isAdmin,
  upload.array("images", 5),
  middlewares.validateBody(movieUpdateSchema),
  movieControllers.updateMovie
);

movieRoutes.delete("/:movieId", middlewares.isAdmin, movieControllers.deleteMovie);

export default movieRoutes;
