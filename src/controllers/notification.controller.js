import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getMyNotifications = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const companyId = req.user?.companyId;
  const { page, limit, read } = req.query;

  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const filter = { companyId, recipient: req.user._id };

  if (read === "true") filter.read = true;
  if (read === "false") filter.read = false;

  const allNotifications = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  const totalNotifications = await Notification.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        notifications: allNotifications,
        totalNotifications,
        page: pageNum,
        limit: limitNum,
      },
      "All notifications found"
    )
  );
});

const markNotificationRead = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const companyId = req.user?.companyId;
  const notificationId = req.params.notificationId;

  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (!mongoose.isValidObjectId(notificationId)) {
    throw new ApiError(400, "Invalid notification id");
  }

  const notifications = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      recipient: req.user._id,
      companyId: req.user.companyId,
    },
    { read: true },
    { new: true }
  );

  if (!notifications) {
    throw new ApiError(404, "No Notifications found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications found"));
});

const markAllNotificationsRead = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const companyId = req.user?.companyId;

  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  const markNotifications = await Notification.updateMany(
    { recipient: req.user._id, companyId: companyId, read: false },
    { read: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { modifiedCount: markNotifications.modifiedCount },
        "All notifications marked as read"
      )
    );
});

const getUnreadCount = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const companyId = req.user?.companyId;

  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }

  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  const unreadCount = await Notification.countDocuments({
    recipient: req.user._id,
    companyId: req.user.companyId,
    read: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { unreadCount: unreadCount }, "Unread count"));
});

export {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
};
