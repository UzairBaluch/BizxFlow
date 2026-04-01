import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const required = [fullName, email, password];

  if (!required.every((v) => typeof v === "string" && v.trim())) {
    throw new ApiError(400, "all fields are required");
  }

  const pictureLocalPath = req.files?.picture?.[0]?.path;

  const companyId = req.company?._id ?? req.user?.companyId;

  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (!req.company && (!req.user || req.user.role !== "Manager")) {
    throw new ApiError(403, "Unauthorized request");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User with this email already exists");
  }

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
    companyId: companyId,
    role: role || "Employee",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while adding the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User added successfully"));
});

export { addUser };
