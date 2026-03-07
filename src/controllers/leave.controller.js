import { Leave } from "../models/leave.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/sendEmail.js";

const submitLeave = asyncHandler(async (req, res) => {
  const user = req.user;
  const email = req.user.email;
  if (!email) {
    throw new ApiError(401, "Unauthorized request");
  }
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }
  const { leaveType, startDate, endDate, reason } = req.body;
  if (!leaveType || !startDate || !endDate) {
    throw new ApiError(400, "leaveType, startDate and endDate are required");
  }

  if (new Date(startDate) > new Date(endDate)) {
    throw new ApiError(400, "startDate cannot be after endDate");
  }
  const createLeave = await Leave.create({
    employee: req.user?._id,
    leaveType,
    startDate,
    endDate,
    reason,
  });
  await sendMail(
    email,
    "New Leave Request",
    `<p>Your <strong>${leaveType}</strong> leave request from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been submitted and is pending approval.</p>`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createLeave, "Leave created successfully"));
});

const updateLeaveStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const leaveId = req.params.leaveId;

  if (status !== "Approved" && status !== "Rejected") {
    throw new ApiError(400, "Invalid Status");
  }

  const leave = await Leave.findById(leaveId);
  if (!leave) {
    throw new ApiError(404, "Leave not found");
  }

  if (leave.status === "Approved" || leave.status === "Rejected") {
    throw new ApiError(400, "Leave already reviewed");
  }

  leave.status = status;
  leave.reviewedBy = req.user._id;
  await leave.save();

  const emailInfo = await User.findById(leave.employee);
  await sendMail(
    emailInfo.email,
    "Leave Request Update",
    `<p> Your Leave request has been <strong> ${status} </strong>.</p>`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Leave status updated successfully"));
});

const getAllLeaves = asyncHandler(async (req, res) => {
  if (req.user.role !== "Admin" && req.user.role !== "Manager") {
    throw new ApiError(403, "Unauthorized request");
  }
  const leaves = await Leave.find().populate("employee", "fullName email");

  return res
    .status(200)
    .json(new ApiResponse(200, leaves, "all leaves records found"));
});

const getMyLeaves = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }
  const leaveFound = await Leave.find({
    employee: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, leaveFound, "All My Leaves Found"));
});

export { submitLeave, updateLeaveStatus, getAllLeaves, getMyLeaves };
