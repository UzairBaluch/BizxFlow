import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErr.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inComingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!inComingRefreshToken) {
    throw new ApiError(400, "unauthorized reqest");
  }

try {
      const decodedToken = jwt.verify(
        inComingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    
      const user = await User.findById(decodedToken?._id);
    
      if (!user) {
        throw new ApiError(400, "Invalid Access Token");
      }
    
      if (inComingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
      }
    
      const options = {
        httpOnly: true,
        secure: true,
      };
    
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshToken(user._id);
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new ApiResponse(200, {
            accessToken,
            newRefreshToken: newRefreshToken,
          },"Access Token Refreshed")
        );
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh  Token")
}
});

export {refreshAccessToken}
