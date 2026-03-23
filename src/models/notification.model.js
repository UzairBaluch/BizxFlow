import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "TASK_ASSIGNED",
        "LEAVE_APPROVED",
        "LEAVE_SUBMITTED",
        "LEAVE_REJECTED",
        "ANNOUNCEMENT_CREATED",
      ],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      default: "",
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);
notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ companyId: 1, recipient: 1, createdAt: -1 });

export const Notification = mongoose.model("Notification", notificationSchema);
