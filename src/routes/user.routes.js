import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { loginUser } from "../controllers/loginUser.controller.js";
import {verifyJWT} from "../middlewares/auth.middelware.js"
import { logoutUser } from "../controllers/logoutUser.controller.js";
import { refreshAccessToken } from "../controllers/refreshAccessToken.controller.js";

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
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


export default router