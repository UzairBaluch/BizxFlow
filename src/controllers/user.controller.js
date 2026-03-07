import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { User } from "../models/user.model.js";

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

export { registerUser };
