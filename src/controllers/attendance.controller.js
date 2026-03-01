import { Attendance } from "../models/attendance.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { date } from "../utils/DateMaker.js";

const checkInUser = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { role } = req.user;
  if (role !== "Employee") {
    throw new ApiError(400, " unauthorized reqest");
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
    checkIn: new Date(),
    date: startDay,
  });

  if (!userRecord) {
    throw new ApiError(
      500,
      "something went wrong while registerning attendace"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userRecord, "attendace registered successfully")
    );
});

const checkOutUser = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  if (!user) {
    throw new ApiError(400, "unauthorized reqest");
  }

  const { role } = req.user;
  if (role !== "Employee") {
    throw new ApiError(400, "unauthorized reqest");
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
    throw new ApiError(400, "already checkout ");
  }
  const updatedRecord = await Attendance.findByIdAndUpdate(
    recordAttendance?._id,
    { $set: { checkOut: new Date() } },
    { new: true }
  );

  if (!updatedRecord) {
    throw new ApiError(500,"something went wrong")
  }

  return res
  .status(200)
  .json(new ApiResponse(200,updatedRecord, "attendance updated successfully"))
});

export { checkInUser, checkOutUser };
