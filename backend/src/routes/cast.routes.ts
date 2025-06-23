import { Router } from "express";
import middlewares from "../middlewares";
import { castControllers } from "../controllers";

const castRoutes: Router = Router();

castRoutes.use(middlewares.verifyToken);

castRoutes.post(
  "/:movieId/:actorId",
  middlewares.isAdmin,
  middlewares.verifyActorIdExists,
  middlewares.verifyMovieIdExists,
  castControllers.addActorToMovie
);

castRoutes.delete(
  "/:castId",
  middlewares.isAdmin,
  middlewares.verifyCastIdExists,
  castControllers.removeActorFromMovie
);

export default castRoutes;
