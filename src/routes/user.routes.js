import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { loginUser } from "../controllers/loginUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middelware.js";
import { logoutUser } from "../controllers/logoutUser.controller.js";
import { refreshAccessToken } from "../controllers/refreshAccessToken.controller.js";
import {
  checkInUser,
  checkOutUser,
  checkRecord,
  getAllAttendance,
} from "../controllers/attendance.controller.js";
import { task } from "../controllers/task.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "picture",
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/checkIn").post(verifyJWT, checkInUser);
router.route("/checkOut").post(verifyJWT, checkOutUser);
router.route("/check-record").get(verifyJWT, checkRecord);
router.route("/record-all").get(verifyJWT, getAllAttendance);
router.route("/tasks").post(verifyJWT, task);

export default router;
