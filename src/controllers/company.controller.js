import { Company } from "../models/company.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

const registerCompany = asyncHandler(async (req, res) => {
  const { email, password, companyName } = req.body;

  const emailValue = email?.trim();
  const passwordValue = password?.trim();
  const companyNameValue = companyName?.trim();

  if (!emailValue || !passwordValue || !companyNameValue) {
    throw new ApiError(400, "all fields are required");
  }

  const existedCompany = await Company.findOne({ email: emailValue });
  if (existedCompany) {
    throw new ApiError(400, "Company with email already exists");
  }
  const logoLocalPath = req.files?.logo?.[0]?.path;
  let logoUrl = "";
  if (logoLocalPath) {
    const logoRef = await uploadOnCloudinary(logoLocalPath);
    if (!logoRef) {
      throw new ApiError(500, "Failed to upload logo");
    }
    logoUrl = logoRef.url;
  }

  const company = await Company.create({
    companyName: companyNameValue,
    ...(logoUrl && { logo: logoUrl }),
    email: emailValue,
    password: passwordValue,
  });

  const createdCompany = await Company.findById(company._id).select(
    "-password"
  );
  if (!createdCompany) {
    throw new ApiError(
      500,
      "Something went wrong while registering the company"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdCompany, "Company registered successfully")
    );
});

const updateCompany = asyncHandler(async (req, res) => {
  if (!req.company) {
    throw new ApiError(403, "Company account required");
  }
  const { companyName } = req.body;
  const logoLocalPath = req.files?.logo?.[0]?.path;
  let logoUrl;
  if (logoLocalPath) {
    const logoRef = await uploadOnCloudinary(logoLocalPath);
    if (!logoRef) throw new ApiError(500, "Failed to upload logo");
    logoUrl = logoRef.url;
  }
  const updated = await Company.findByIdAndUpdate(
    req.company._id,
    {
      ...(companyName?.trim() && { companyName }),
      ...(logoUrl && { logo: logoUrl }),
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Company updated successfully"));
});

export { registerCompany, updateCompany };
