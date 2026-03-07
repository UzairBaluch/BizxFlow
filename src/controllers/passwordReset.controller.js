import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ResetToken } from "../models/resetToken.model.js";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/sendEmail.js";
import crypto from "crypto";

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is Required");
  }
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new ApiError(404, "No User Exists");
  }
  const token = crypto.randomBytes(32).toString("hex");

  await ResetToken.deleteOne({ userId: findUser._id });
  const resetToken = await ResetToken.create({
    userId: findUser?._id,
    token,
  });

  await sendMail(
    findUser.email,
    "Password Reset Request",
    `<p>Click the link to reset your password: <a href="http://localhost:8000/api/v1/users/reset-password/${token}">Reset Password</a></p>`
  );
  return res.status(200).json(new ApiResponse(200, {}, "Reset Token Created"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;
  if (!token) {
    throw new ApiError(404, "Token is required");
  }
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiError(400, "New Password is not found");
  }
  const resetToken = await ResetToken.findOne({ token });
  if (!resetToken) {
    throw new ApiError(400, "Invalid Reset Token ");
  }
  const user = await User.findById(resetToken.userId);

  if (!user) {
    throw new ApiError(404, "Invalid user");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "Password length is to short");
  }
  user.password = newPassword;
  await user.save();
  await ResetToken.deleteOne({ token });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});
export { forgotPassword, resetPassword };
