import { Router } from "express";
import middlewares from "../middlewares";
import { sessionSchema } from "../schemas";
import { sessionController } from "../controllers";

const sessionRoutes: Router = Router();

sessionRoutes.post("", middlewares.validateBody(sessionSchema), sessionController.createSession);

export default sessionRoutes;
