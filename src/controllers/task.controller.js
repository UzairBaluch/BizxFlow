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
    assignedTo,
    dueDate,
    createdBy: req.user?._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createTask, "Task Created Successfully"));
});

const getMyTask = asyncHandler(async (req, res) => {
  const user = req.user?._id;

  if (!user) {
    throw new ApiError(400, "Unauthorized Request");
  }

  const taskFound = await Task.find({
    assignedTo: user,
  }).sort({ dueDate: 1, createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, taskFound, "Task Found Successfully"));
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized Request");
  }
  const taskId = req.params.id;
  const { status } = req.body;
  if (!taskId) {
    throw new ApiError(400, "No Id Found");
  }
  if (!status) {
    throw new ApiError(400, "Status is required");
  }
  const validStatuses = ["Pending", "In Progress", "Done"];
  if (!validStatuses.includes(status.trim())) {
    throw new ApiError(400, "Invalid status");
  }

  const loadTask = await Task.findById(taskId);
  if (!loadTask) {
    throw new ApiError(404, "No Task Found");
  }

  if (loadTask.assignedTo.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only Assignee can Update");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { status: status.trim() },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task is Updated Successfully"));
});

export { task, getMyTask, updateTaskStatus };
