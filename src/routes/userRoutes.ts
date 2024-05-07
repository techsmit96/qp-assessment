import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController";
// import { registerController } from "../controllers/userConntroller";
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";

const router = Router();

router.post(
  "/register",
  UserValidators.signUp(),
  GlobalMiddleWare.checkError,
  registerController
);
router.post(
  "/login",
  UserValidators.login(),
  GlobalMiddleWare.checkError,
  loginController
);
router.post("/logout", GlobalMiddleWare.authenticate, logoutController);

export default router;
