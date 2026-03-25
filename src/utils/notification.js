import { Notification } from "../models/notification.model.js";
import { enrichNotificationMetadata } from "./notificationMetadata.js";

const createNotificationSafe = async (payload) => {
  try {
    const metadata = enrichNotificationMetadata(payload.metadata);
    return await Notification.create({ ...payload, metadata });
  } catch (err) {
    console.error("BizxFlow notification create failed", err?.message);
    return null;
  }
};

export { createNotificationSafe };
