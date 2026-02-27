import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { loginUser } from "../controllers/loginUser.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "picture",
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser)


export default router