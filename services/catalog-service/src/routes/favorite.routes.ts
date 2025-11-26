import { Router } from "express";
import middlewares from "../middlewares";
import { favoriteControllers } from "../controllers";

const favoriteRoutes: Router = Router();

favoriteRoutes.use(middlewares.verifyToken);

favoriteRoutes.post(
  "/:movieId/:userId",
  middlewares.isAdminOrOwner,
  middlewares.verifyUserIdExists,
  middlewares.verifyMovieIdExists,
  favoriteControllers.createFavorite
);

favoriteRoutes.get(
  "/all/:userId",
  middlewares.verifyUserIdExists,
  middlewares.isAdminOrOwner,
  favoriteControllers.getAllFavoritesFromUser
);

favoriteRoutes.get(
  "/:favoriteId",
  middlewares.verifyFavoriteIdExists,
  middlewares.isAdminOrOwner,
  favoriteControllers.getFavoriteById
);

favoriteRoutes.delete(
  "/:favoriteId",
  middlewares.verifyFavoriteIdExists,
  middlewares.isAdminOrOwner,
  favoriteControllers.deleteFavorite
);

export default favoriteRoutes;
