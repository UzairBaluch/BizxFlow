import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/sendEmail.js";
import { createNotificationSafe } from "../utils/notification.js";
import { emitNotificationToUser } from "../socket/io.js";

const task = asyncHandler(async (req, res) => {
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

  const { title, description, assignedTo, dueDate } = req.body;
  if (!title || !assignedTo) {
    throw new ApiError(400, "Title and assignedTo are required");
  }

  const assignedCheck = await User.findById(assignedTo);

  if (!assignedCheck) {
    throw new ApiError(400, "assigned to not found");
  }

  if (assignedCheck.companyId.toString() !== companyId.toString()) {
    throw new ApiError(403, "Assignee must belong to your company");
  }

  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    throw new ApiError(400, "Invalid due date");
  }

  const createPayload = {
    title,
    description,
    assignedTo,
    companyId,
    dueDate,
  };

  if (req.company) {
    createPayload.createdByCompany = req.company._id;
    createPayload.createdBy = null;
  } else {
    createPayload.createdBy = req.user._id;
    createPayload.createdByCompany = null;
  }

  const createTask = await Task.create(createPayload);

  await sendMail(
    assignedCheck.email,
    "New Task Assigned",
    `<p>You have been assigned a new task: <strong>${title}</strong>.</p>`
  );

  const taskNotif = await createNotificationSafe({
    companyId,
    recipient: assignedTo,
    type: "TASK_ASSIGNED",
    title: "New task assigned",
    body: `You were assigned: ${title}`,
    metadata: { taskId: createTask._id.toString() },
  });
  if (taskNotif) {
    emitNotificationToUser(assignedTo, taskNotif);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createTask, "Task Created Successfully"));
});

const getMyTask = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }
  const companyId = user.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  const { page, limit, search } = req.query;
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const filter = { assignedTo: user._id, companyId };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const taskFound = await Task.find(filter)
    .sort({ dueDate: 1, createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);
  const totalTasks = await Task.countDocuments(filter);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { tasks: taskFound, totalTasks, page: pageNum, limit: limitNum },
        "Tasks found successfully"
      )
    );
});

const getAllTasks = asyncHandler(async (req, res) => {
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

  const { page, limit, search, status } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const filter = { companyId };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  const trimmed = status?.trim();
  if (trimmed && ["Pending", "In Progress", "Done"].includes(trimmed)) {
    filter.status = trimmed;
  }

  const taskFound = await Task.find(filter)
    .populate("assignedTo", "fullName email role")
    .populate("createdBy", "fullName email")
    .populate("createdByCompany", "companyName")
    .sort({ dueDate: 1, createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);
  const totalTasks = await Task.countDocuments(filter);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { tasks: taskFound, totalTasks, page: pageNum, limit: limitNum },
        "All company tasks found successfully"
      )
    );
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

  if (
    !loadTask.companyId ||
    loadTask.companyId.toString() !== user.companyId.toString()
  ) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (loadTask.assignedTo.toString() !== user._id.toString()) {
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

export { task, getMyTask, getAllTasks, updateTaskStatus };
