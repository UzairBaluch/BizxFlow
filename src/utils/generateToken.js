import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { ApiError } from "../utils/ApiErr.js";
const generateAccessAndRefreshToken = async (id, type) => {
  if (!id || !type) {
    throw new ApiError(400, "id and type are required");
  }

  if (type !== "user" && type !== "company") {
    throw new ApiError(400, "invalid type");
  }

  try {
    if (type === "user") {
      const user = await User.findById(id);

      if (!user) {
        throw new ApiError(400, "Invalid user");
      }

      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } else {
      const company = await Company.findById(id);

      if (!company) {
        throw new ApiError(400, "Invalid company");
      }

      const accessToken = await company.generateAccessToken();
      const refreshToken = await company.generateRefreshToken();

      company.refreshToken = refreshToken;
      await company.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error("[BizxFlow] generateAccessAndRefreshToken error", error);
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      throw new ApiError(
        500,
        "Server misconfiguration: token secrets not set ..."
      );
    }
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};
export { generateAccessAndRefreshToken };
