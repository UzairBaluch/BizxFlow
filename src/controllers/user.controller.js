import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { parsePagination } from "../utils/parsePagination.js";

const DIRECTORY_ROLES = ["Manager", "Employee"];

const resolveDirectoryCompanyId = (req) => {
  const companyId = req.company?._id ?? req.user?.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (!req.company && (!req.user || req.user.role !== "Manager")) {
    throw new ApiError(403, "Unauthorized request");
  }
  return companyId;
};

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

  const pictureLocalPath = req.files?.picture?.[0]?.path;
  let pictureUrl = "";

  if (pictureLocalPath) {
    const pictureRef = await uploadOnCloudinary(pictureLocalPath);
    if (!pictureRef) {
      throw new ApiError(500, "Failed to upload picture");
    }
    pictureUrl = pictureRef.url;
  }

  const user = await User.create({
    fullName,
    ...(pictureUrl && { picture: pictureUrl }),
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
  const companyId = req.company?._id ?? req.user?.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (req.user && req.user.role !== "Manager") {
    throw new ApiError(403, "Unauthorized request");
  }
  const { search } = req.query;
  const { page: pageNum, limit: limitNum, skip } = parsePagination(req.query);
  const filter = { companyId };
  if (search) {
    filter.fullName = { $regex: search, $options: "i" };
  }

  const allUsers = await User.find(filter)
    .select("-password -refreshToken")
    .skip(skip)
    .limit(limitNum);
  const totalUsers = await User.countDocuments(filter);

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

  if (!currentPassword?.trim() || !newPassword?.trim()) {
    throw new ApiError(400, "Current and new password are required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be more than 6 characters");
  }

  if (req.company) {
    const company = await Company.findById(req.company._id);
    if (!company) throw new ApiError(404, "Company not found");
    const isValid = await company.isPasswordCorrect(currentPassword);
    if (!isValid) throw new ApiError(400, "Current password is incorrect");
    company.password = newPassword;
    await company.save();
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Company password changed successfully"));
  }

  const user = await User.findById(req.user?._id);

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordValid)
    throw new ApiError(400, "Current password is incorrect");
  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(403, "User account required for profile update");
  }

  const { fullName } = req.body;

  const pictureLocalPath = req.files?.picture?.[0]?.path;
  let pictureUrl;

  if (pictureLocalPath) {
    const pictureRef = await uploadOnCloudinary(pictureLocalPath);

    if (!pictureRef) {
      throw new ApiError(500, "Failed to upload picture");
    }
    await deleteFromCloudinary(req.user.picturePublicId || req.user.picture);
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

const getMe = asyncHandler(async (req, res) => {
  if (req.company) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { company: req.company, type: "company" },
          "Current account"
        )
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user, type: "user" }, "Current user")
    );
});

const updateUserRole = asyncHandler(async (req, res) => {
  const companyId = resolveDirectoryCompanyId(req);
  const { userId } = req.params;
  const { role } = req.body;

  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }
  if (!role || !DIRECTORY_ROLES.includes(role)) {
    throw new ApiError(
      400,
      "role must be one of: Manager, Employee (exact capitalization)"
    );
  }

  const target = await User.findById(userId);
  if (!target || target.companyId.toString() !== companyId.toString()) {
    throw new ApiError(404, "User not found");
  }

  if (req.user && target._id.toString() === req.user._id.toString()) {
    throw new ApiError(403, "You cannot change your own role");
  }

  if (target.role === "Manager" && role !== "Manager") {
    const managerCount = await User.countDocuments({
      companyId,
      role: "Manager",
    });
    if (managerCount <= 1) {
      throw new ApiError(
        403,
        "Cannot change role of the last Manager in the company"
      );
    }
  }

  target.role = role;
  await target.save();

  const updated = await User.findById(target._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updated, "User role updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const companyId = resolveDirectoryCompanyId(req);
  const { userId } = req.params;

  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const target = await User.findById(userId);
  if (!target || target.companyId.toString() !== companyId.toString()) {
    throw new ApiError(404, "User not found");
  }

  if (req.user && target._id.toString() === req.user._id.toString()) {
    throw new ApiError(403, "You cannot delete your own account");
  }

  if (target.role === "Manager") {
    const managerCount = await User.countDocuments({
      companyId,
      role: "Manager",
    });
    if (managerCount <= 1) {
      throw new ApiError(403, "Cannot remove the last Manager in the company");
    }
  }

  await User.findByIdAndDelete(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, { deleted: true }, "User removed successfully"));
});

export {
  registerUser,
  getAllUsers,
  changePassword,
  updateProfile,
  getMe,
  updateUserRole,
  deleteUser,
};
