import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { ApiError } from "../utils/ApiErr.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inComingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!inComingRefreshToken) {
    throw new ApiError(400, "unauthorized request");
  }

  let accessToken;
  let refreshToken;

  try {
    const decodedToken = jwt.verify(
      inComingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (decodedToken.type === "user") {

      const user = await User.findById(decodedToken?._id);

      if (!user) {
        throw new ApiError(400, "Invalid refresh / user not found");
      }

      if (inComingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
      }

    ({ accessToken, refreshToken }) =  await generateAccessAndRefreshToken(user._id, decodedToken.type);

    } else if (decodedToken.type === "company") {

      const company = await Company.findById(decodedToken?._id);

      if (!company) {
        throw new ApiError(400, "Invalid refresh / company not found");
      }

      if (inComingRefreshToken !== company?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
      }

     ({accessToken, refreshToken }) = await generateAccessAndRefreshToken(company._id, decodedToken.type);

    } else { 
      throw new ApiError(401, "Invalid refresh token");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, error?.message || "Invalid Refresh  Token");
  }
});

export { refreshAccessToken };
