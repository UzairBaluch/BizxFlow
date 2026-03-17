import { Attendance } from "../models/attendance.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { dateRange } from "../utils/CustomDateMaker.js";
import { date } from "../utils/DateMaker.js";

const checkInUser = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const company = req.user.companyId;
  if (!company) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { role } = req.user;
  if (role !== "Employee") {
    throw new ApiError(403, "Unauthorized request");
  }

  const { startDay, endDay } = date();
  const recordAttendance = await Attendance.findOne({
    user: user,
    date: { $gte: startDay, $lte: endDay },
  });

  if (recordAttendance) {
    throw new ApiError(401, "Record already exists");
  }

  const userRecord = await Attendance.create({
    user,
    companyId: company,
    checkIn: new Date(),
    date: startDay,
  });

  if (!userRecord) {
    throw new ApiError(
      500,
      "Something went wrong while registering attendance"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userRecord, "Attendance registered successfully")
    );
});

const checkOutUser = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  const { role } = req.user;
  if (role !== "Employee") {
    throw new ApiError(403, "Unauthorized request");
  }

  const { startDay, endDay } = date();
  const recordAttendance = await Attendance.findOne({
    user: user,
    date: { $gte: startDay, $lte: endDay },
  });

  if (!recordAttendance) {
    throw new ApiError(400, "No check-in record found");
  }

  if (recordAttendance.checkOut) {
    throw new ApiError(400, "Already checked out");
  }
  const updatedRecord = await Attendance.findByIdAndUpdate(
    recordAttendance?._id,
    { $set: { checkOut: new Date() } },
    { new: true }
  );

  if (!updatedRecord) {
    throw new ApiError(500, "something went wrong");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedRecord, "attendance updated successfully")
    );
});

const checkRecord = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const { from, to } = req.query;
  const { startDate, endDate } = dateRange(from, to);
  const recordAttendance = await Attendance.find({
    user: user,
    date: { $gte: startDate, $lte: endDate },
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        recordAttendance,
        "attendance result found successfully "
      )
    );
});
const getAllAttendance = asyncHandler(async (req, res) => {
  const companyId = req.company?._id ?? req.user?.companyId;

  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (
    !req.company &&
    (!req.user || (req.user.role !== "Admin" && req.user.role !== "Manager"))
  ) {
    throw new ApiError(403, "Unauthorized request");
  }

  const { from, to } = req.query;
  const { startDate, endDate } = dateRange(from, to);
  const recordFind = await Attendance.find({
    companyId,
    date: { $gte: startDate, $lte: endDate },
  })
    .populate("user", "fullName email")
    .sort({ user: 1, date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, recordFind, "all attendance records found"));
});

export { checkInUser, checkOutUser, checkRecord, getAllAttendance };
