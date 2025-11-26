import { Router } from "express";
import movieRoutes from "./movie.routes";
import actorRoutes from "./actor.routes";
import directorRoutes from "./director.routes";
import favoriteRoutes from "./favorite.routes";
import castRoutes from "./cast.routes";
import directorMovieRoutes from "./directorMovie.routes";

const routes: Router = Router();

routes.use("/movies", movieRoutes);
routes.use("/actors", actorRoutes);
routes.use("/directors", directorRoutes);
routes.use("/favorites", favoriteRoutes);
routes.use("/cast", castRoutes);
routes.use("/directorMovie", directorMovieRoutes);

export default routes;
