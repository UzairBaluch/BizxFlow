import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { Leave } from "../models/leave.model.js";
import { Attendance } from "../models/attendance.model.js";

const getDashboard = asyncHandler(async (req, res) => {
  const companyId = req.company?._id ?? req.user?.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  // Company JWT: full KPI access for that tenant. User JWT: Admin/Manager only.
  if (!req.company) {
    if (!req.user || (req.user.role !== "Admin" && req.user.role !== "Manager")) {
      throw new ApiError(403, "Unauthorized request");
    }
  }
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const [
    totalEmployees,
    totalTasks,
    tasksByStatus,
    totalLeaves,
    leaveByStatus,
    todayAttendance,
  ] = await Promise.all([
    User.countDocuments({ role: "Employee", companyId }),
    Task.countDocuments({ companyId }),
    Task.aggregate([
      { $match: { companyId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Leave.countDocuments({ companyId }),
    Leave.aggregate([
      { $match: { companyId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Attendance.countDocuments({
      companyId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalEmployees,
        totalTasks,
        tasksByStatus,
        totalLeaves,
        leaveByStatus,
        todayAttendance,
      },
      "Dashboard data fetched successfully"
    )
  );
});

export { getDashboard };
