import express from "express";
import { userController } from "../controllers/index";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

const userRoutes = express.Router();

userRoutes.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.verifyCPFExists,
  middlewares.verifyEmailExists,
  userController.createUser
);

userRoutes.use("", middlewares.verifyToken);

userRoutes.use("/:userId", middlewares.verifyToken);

userRoutes.use("/:userId", middlewares.verifyUserIdExists);

userRoutes.get("", middlewares.pagination(["name", "email", "admin"]), userController.getAllUsers);

userRoutes.get("/:userId", userController.getUserById);

userRoutes.patch(
  "/:userId",
  middlewares.isAdminOrOwner,
  middlewares.validateBody(userUpdateSchema),
  middlewares.verifyEmailExists,
  userController.updateUser
);

userRoutes.delete("/:userId", middlewares.isAdminOrOwner, userController.deleteUser);

export default userRoutes;
