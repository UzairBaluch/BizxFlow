import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "email and password are required");
  }

  const existedCompany = await Company.findOne({ email });

  if (existedCompany) {
    const isPasswordValid = await existedCompany.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existedCompany._id,
      "company"
    );

    const company = await Company.findById(existedCompany._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            company,
            accessToken,
            refreshToken,
            type: "company",
          },
          "Company logged in successfully"
        )
      );
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) {
    throw new ApiError(400, "No user found with this email");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id,
    "user"
  );

  const loggedUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
          type: "user",
        },
        "User logged in successfully"
      )
    );
});
export { loginUser };
