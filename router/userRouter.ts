import { Router } from "express";
import {
  createUser,
  signInUser,
  verifyUser,
} from "../controller/userController";
import validator from "../utils/validator";
import { registerValidator } from "../utils/entryValidator";

const router: Router = Router();

router.route("/create-user").post(validator(registerValidator), createUser);
router.route("/sign-in-user").post(signInUser);

router.route("/verify-user").patch(verifyUser);
export default router;
