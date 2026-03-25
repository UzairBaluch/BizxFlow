import { Leave } from "../models/leave.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/sendEmail.js";
import { createNotificationSafe } from "../utils/notification.js";
import { emitNotificationToUser } from "../socket/io.js";
import { notifyCompanyAndManagers } from "../utils/notifyOrg.js";

const submitLeave = asyncHandler(async (req, res) => {
  if (req.company) {
    throw new ApiError(403, "User account required");
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }
  const email = user.email;
  const company = user.companyId;
  if (!company) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (!email) {
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
    employee: user._id,
    leaveType,
    companyId: company,
    startDate,
    endDate,
    reason,
  });
  await sendMail(
    email,
    "New Leave Request",
    `<p>Your <strong>${leaveType}</strong> leave request from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been submitted and is pending approval.</p>`
  );

  await notifyCompanyAndManagers(company, {
    type: "LEAVE_SUBMITTED",
    title: "New leave request",
    body: `${user.fullName || email} submitted ${leaveType} leave (${startDate} to ${endDate}).`,
    metadata: {
      leaveId: createLeave._id.toString(),
      employeeId: user._id.toString(),
    },
    skipManagerUserIds: [user._id],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, createLeave, "Leave created successfully"));
});

const updateLeaveStatus = asyncHandler(async (req, res) => {
  const companyId = req.company?._id ?? req.user?.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (!req.company && (!req.user || req.user.role !== "Manager")) {
    throw new ApiError(403, "Unauthorized request");
  }

  const { status } = req.body;
  const leaveId = req.params.leaveId;

  if (status !== "Approved" && status !== "Rejected") {
    throw new ApiError(400, "Invalid Status");
  }

  const leave = await Leave.findById(leaveId);
  if (!leave) {
    throw new ApiError(404, "Leave not found");
  }

  if (!leave.companyId || leave.companyId.toString() !== companyId.toString()) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (leave.status === "Approved" || leave.status === "Rejected") {
    throw new ApiError(400, "Leave already reviewed");
  }

  leave.status = status;
  if (req.company) {
    leave.reviewedByCompany = req.company._id;
    leave.reviewedBy = null;
  } else {
    leave.reviewedBy = req.user._id;
    leave.reviewedByCompany = null;
  }
  await leave.save();

  const emailInfo = await User.findById(leave.employee);
  await sendMail(
    emailInfo.email,
    "Leave Request Update",
    `<p> Your Leave request has been <strong> ${status} </strong>.</p>`
  );

  const leaveDecisionNotif = await createNotificationSafe({
    companyId: leave.companyId,
    recipient: leave.employee,
    type: status === "Approved" ? "LEAVE_APPROVED" : "LEAVE_REJECTED",
    title: status === "Approved" ? "Leave approved" : "Leave rejected",
    body: `Your ${leave.leaveType} leave request was ${status.toLowerCase()}.`,
    metadata: { leaveId: leave._id.toString() },
  });
  if (leaveDecisionNotif) {
    emitNotificationToUser(leave.employee, leaveDecisionNotif);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Leave status updated successfully"));
});

const getAllLeaves = asyncHandler(async (req, res) => {
  const companyId = req.company?._id ?? req.user?.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (!req.company && (!req.user || req.user.role !== "Manager")) {
    throw new ApiError(403, "Unauthorized request");
  }
  const leaves = await Leave.find({ companyId }).populate(
    "employee",
    "fullName email"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, leaves, "all leaves records found"));
});

const getMyLeaves = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }
  const companyId = user.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  const leaveFound = await Leave.find({
    companyId,
    employee: user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, leaveFound, "All My Leaves Found"));
});

export { submitLeave, updateLeaveStatus, getAllLeaves, getMyLeaves };
