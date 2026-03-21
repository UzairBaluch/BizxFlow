import { Router } from "express";
import {
  updateProfile,
  changePassword,
  getAllUsers,
  getMe,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller.js";
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
import {
  getAllTasks,
  getMyTask,
  task,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import {
  getAllLeaves,
  getMyLeaves,
  submitLeave,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/passwordReset.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.middelware.js";
import { getDashboard } from "../controllers/dashboard.controller.js";
import {
  announcements,
  getAnnouncements,
} from "../controllers/announcement.controller.js";
import {
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { addUser } from "../controllers/addUser.controller.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "logo",
    },
  ]),
  authLimiter,
  registerCompany
);
router.route("/add-user").post(
  verifyJWT,
  upload.fields([
    {
      name: "picture",
    },
  ]),
  addUser
);
router.route("/login").post(authLimiter, loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getMe);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/checkIn").post(verifyJWT, checkInUser);
router.route("/checkOut").post(verifyJWT, checkOutUser);
router.route("/check-record").get(verifyJWT, checkRecord);
router.route("/record-all").get(verifyJWT, getAllAttendance);
router.route("/tasks").post(verifyJWT, task);
router.route("/tasks").get(verifyJWT, getMyTask);
router.route("/all-tasks").get(verifyJWT, getAllTasks);
router.route("/tasks/:id").patch(verifyJWT, updateTaskStatus);
router.route("/submit-leave").post(verifyJWT, submitLeave);
router.route("/update-leave/:leaveId").patch(verifyJWT, updateLeaveStatus);
router.route("/all-leaves").get(verifyJWT, getAllLeaves);
router.route("/my-leaves").get(verifyJWT, getMyLeaves);
router.route("/forgot-password").post(authLimiter, forgotPassword);
router.route("/reset-password/:token").post(authLimiter, resetPassword);
router.route("/all-users").get(verifyJWT, getAllUsers);
router.route("/update-user-role/:userId").patch(verifyJWT, updateUserRole);
router.route("/delete-user/:userId").delete(verifyJWT, deleteUser);
router.route("/change-password").patch(verifyJWT, changePassword);
router
  .route("/company")
  .patch(verifyJWT, upload.fields([{ name: "logo" }]), updateCompany);
router.route("/update-profile").patch(
  verifyJWT,
  upload.fields([
    {
      name: "picture",
    },
  ]),
  updateProfile
);
router.route("/dashboard").get(verifyJWT, getDashboard);
router
  .route("/announcements")
  .post(verifyJWT, announcements)
  .get(verifyJWT, getAnnouncements);

export default router;
