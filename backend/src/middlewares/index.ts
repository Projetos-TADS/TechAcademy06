import handleError from "./handleError.middleware";
import validateBody from "./validateBody.middleware";
import verifyUserIdExists from "./verifyUserIdExists.middleware";
import verifyEmailExists from "./verifyEmailExists.middleware";
import isAdmin from "./isAdmin.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyMovieIdExists from "./verifyMovieIdExists.middleware.middleware";
import verifyFavoriteIdExists from "./verifyFavoriteIdExists.middleware";
import verifyActorIdExists from "./verifyActorIdExists.middleware";
import isAdminOrOwner from "./isAdminOrOwner.middleware";
import verifyDirectorIdExists from "./verifyDirectorIdExists.middleware";
import verifyCastIdExists from "./verifyCastIdExists.middleware";
import verifyDirectorMovieIdExists from "./verifyDirectorMovieIdExists.middleware";
import pagination from "./pagination.middleware";
import verifyCPFExists from "./verifyCPFExists.middleware";

export default {
  handleError,
  validateBody,
  verifyUserIdExists,
  verifyEmailExists,
  isAdmin,
  verifyToken,
  verifyMovieIdExists,
  verifyFavoriteIdExists,
  verifyActorIdExists,
  isAdminOrOwner,
  verifyDirectorIdExists,
  verifyCastIdExists,
  verifyDirectorMovieIdExists,
  pagination,
  verifyCPFExists,
};
