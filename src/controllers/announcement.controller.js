import { Announcement } from "../models/announcement.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const announcements = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (req.user.role !== "Admin" && req.user.role !== "Manager") {
    throw new ApiError(403, "Unauthorized request");
  }
  const { title, body } = req.body;
  if (!title.trim() || !body.trim()) {
    throw new ApiError(400, "Title and Body are required");
  }
  const createAnnouncement = await Announcement.create({
    title,
    body,
    createdBy: user._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createAnnouncement,
        "Announcement created successfully"
      )
    );
});

const getAnnouncements = asyncHandler(async (req, res) => {
  const allAnnouncements = await Announcement.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(
      new ApiResponse(200, allAnnouncements, "Announcement found successfully")
    );
});
export { announcements, getAnnouncements };
