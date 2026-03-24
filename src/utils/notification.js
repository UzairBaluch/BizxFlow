import { Notification } from "../models/notification.model.js";

const createNotificationSafe = async (payload) => {
  try {
    return await Notification.create(payload);
  } catch (err) {
    console.error("BizxFlow notification create failed", err?.message);
    return null;
  }
};

export { createNotificationSafe };
