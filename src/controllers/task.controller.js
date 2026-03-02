import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const task = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Unauthorized request");
  }

  if (req.user.role !== "Admin" && req.user.role !== "Manager") {
    throw new ApiError(403, "Unauthorized request");
  }

  const { title, description, assignedTo, dueDate } = req.body;
  if (!title || !assignedTo) {
    throw new ApiError(400, "Title and assignedTo are required");
  }

  const assignedCheck = await User.findById(assignedTo);
  if (!assignedCheck) {
    throw new ApiError(400, "assigned to not found");
  }
  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    throw new ApiError(400, "Invalid due date");
  }
  const createTask = await Task.create({
    title,
    description,
    assignedTo: assignedCheck,
    dueDate,
    createdBy: req.user?._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createTask, "Task Created Successfully"));
});

export { task };
