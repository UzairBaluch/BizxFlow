import { ApiError } from "../utils/ApiErr.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const type = decoded?.type;

    if (type === "company") {
      const company = await Company.findById(decoded._id).select("-password");
      if (!company) {
        throw new ApiError(401, "Invalid Access Token");
      }
      req.company = company;
      req.user = null;
      return next();
    }

    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    req.company = null;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
