import { Router } from "express";
import middlewares from "../middlewares";
import { actorCreateSchema, actorUpdateSchema } from "../schemas";
import { actorControllers } from "../controllers";

const actorRoutes: Router = Router();

actorRoutes.use(middlewares.verifyToken);

actorRoutes.post(
  "",
  middlewares.isAdmin,
  middlewares.validateBody(actorCreateSchema),
  actorControllers.createActor
);
actorRoutes.get(
  "",
  middlewares.pagination(["name", "birthDate", "nationality"]),
  actorControllers.getAllActors
);

actorRoutes.use("/:actorId", middlewares.verifyActorIdExists);

actorRoutes.get("/:actorId", actorControllers.getActorById);

actorRoutes.patch(
  "/:actorId",
  middlewares.isAdmin,
  middlewares.validateBody(actorUpdateSchema),
  actorControllers.updateActor
);

actorRoutes.delete("/:actorId", middlewares.isAdmin, actorControllers.deleteActor);

export default actorRoutes;
