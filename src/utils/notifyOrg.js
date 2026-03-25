import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { createNotificationSafe } from "./notification.js";
import {
  emitNotificationToCompany,
  emitNotificationToUser,
} from "../socket/io.js";

function toObjectId(id) {
  if (id == null) return id;
  if (id instanceof mongoose.Types.ObjectId) return id;
  if (typeof id === "object" && id._id != null) {
    return new mongoose.Types.ObjectId(String(id._id));
  }
  return new mongoose.Types.ObjectId(String(id));
}

/**
 * One notification row for the company account inbox + one per Manager user.
 */
export async function notifyCompanyAndManagers(companyId, {
  type,
  title,
  body,
  metadata = {},
  skipManagerUserIds = [],
}) {
  const cid = toObjectId(companyId?._id ?? companyId);
  const skipManagers = new Set(
    skipManagerUserIds.map((id) => id?.toString?.() ?? String(id))
  );

  const companyNotif = await createNotificationSafe({
    companyId: cid,
    recipientCompany: cid,
    type,
    title,
    body,
    metadata: { ...metadata },
  });
  if (companyNotif) {
    emitNotificationToCompany(cid.toString(), companyNotif);
  }

  const managers = await User.find({ companyId: cid, role: "Manager" }).select(
    "_id"
  );
  for (const m of managers) {
    if (skipManagers.has(m._id.toString())) continue;
    const doc = await createNotificationSafe({
      companyId: cid,
      recipient: m._id,
      type,
      title,
      body,
      metadata: { ...metadata },
    });
    if (doc) {
      emitNotificationToUser(m._id, doc);
    }
  }
}
