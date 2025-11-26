import { Router } from "express";
import middlewares from "../middlewares";
import { directorMovieControllers } from "../controllers";

const directorMovieRoutes: Router = Router();

directorMovieRoutes.use(middlewares.verifyToken);

directorMovieRoutes.post(
  "/:movieId/:directorId",
  middlewares.isAdmin,
  middlewares.verifyDirectorIdExists,
  middlewares.verifyMovieIdExists,
  directorMovieControllers.addDirectorToMovie
);

directorMovieRoutes.delete(
  "/:directorMovieId",
  middlewares.isAdmin,
  middlewares.verifyDirectorMovieIdExists,
  directorMovieControllers.removeDirectorFromMovie
);

export default directorMovieRoutes;
