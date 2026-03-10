import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { User } from "../models/user.model.js";
import { parse } from "path";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const pictureLocalPath = req.files?.picture[0]?.path;

  if (!pictureLocalPath) {
    throw new ApiError(400, "Picture is required");
  }

  const pictureRef = await uploadOnCloudinary(pictureLocalPath);
  if (!pictureRef) {
    throw new ApiError(500, "Failed to upload picture");
  }
  const user = await User.create({
    fullName,
    picture: pictureRef.url,
    email,
    password,
    role: role || "Employee",
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering  the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});
const getAllUsers = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "No user found");
  }
  const role = req.user.role;

  if (role !== "Admin") {
    throw new ApiError(403, "Unauthorized request");
  }
  const { page, limit, search } = req.query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  let filter = {};

  if (search) {
    filter.fullName = { $regex: search, $options: "i" };
  }

  const allUsers = await User.find(filter)
    .select("-password -refreshToken")
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  const totalUsers = await User.countDocuments(filter);

  if (allUsers.length === 0) {
    throw new ApiError(404, "No users found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { users: allUsers, totalUsers, page: pageNum, limit: limitNum },
        "All users found"
      )
    );
});
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if ([currentPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Current and New password  are required");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be more than 6 characters");
  }
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
const updateProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const pictureLocalPath = req.files?.picture?.[0]?.path;
  let pictureUrl;

  if (pictureLocalPath) {
    const pictureRef = await uploadOnCloudinary(pictureLocalPath);

    if (!pictureRef) {
      throw new ApiError(500, "Failed to upload picture");
    }
    await deleteFromCloudinary(req.user.picture);
    pictureUrl = pictureRef.url;
  }

  const uppdatePicture = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, ...(pictureUrl && { picture: pictureUrl }) },
    { new: true }
  ).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, uppdatePicture, "Profile updated successfully"));
});

export { registerUser, getAllUsers, changePassword, updateProfile };
