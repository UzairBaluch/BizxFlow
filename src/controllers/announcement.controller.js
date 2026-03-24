import { Announcement } from "../models/announcement.model.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { emitNotificationToUser } from "../socket/io.js";

const announcements = asyncHandler(async (req, res) => {
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

  const { title, body } = req.body;
  if (!title?.trim() || !body?.trim()) {
    throw new ApiError(400, "Title and Body are required");
  }

  const createPayload = {
    title: title.trim(),
    body: body.trim(),
    companyId,
  };
  if (req.company) {
    createPayload.createdByCompany = req.company._id;
    createPayload.createdBy = null;
  } else {
    createPayload.createdBy = req.user._id;
    createPayload.createdByCompany = null;
  }

  const createAnnouncement = await Announcement.create(createPayload);

  const recipientFilter = { companyId };
  if (req.user?._id) {
    recipientFilter._id = { $ne: req.user._id };
  }
  const recipients = await User.find(recipientFilter).select("_id").lean();

  if (recipients.length > 0) {
    const preview =
      createAnnouncement.body.length > 240
        ? `${createAnnouncement.body.slice(0, 240)}…`
        : createAnnouncement.body;
    try {
      const createdNotifs = await Notification.insertMany(
        recipients.map((u) => ({
          companyId,
          recipient: u._id,
          type: "ANNOUNCEMENT_CREATED",
          title: createAnnouncement.title,
          body: preview,
          metadata: {
            announcementId: createAnnouncement._id.toString(),
          },
        }))
      );
      for (const doc of createdNotifs) {
        emitNotificationToUser(doc.recipient, doc);
      }
    } catch (err) {
      console.error("BizxFlow announcement notifications failed", err?.message);
    }
  }

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
  const companyId = req.company?._id ?? req.user?.companyId;
  if (!companyId) {
    throw new ApiError(403, "Unauthorized request");
  }

  const allAnnouncements = await Announcement.find({ companyId }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, allAnnouncements, "Announcement found successfully")
    );
});
export { announcements, getAnnouncements };
