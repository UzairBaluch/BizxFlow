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
    },
    recipientCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    type: {
      type: String,
      required: true,
      enum: [
        "TASK_ASSIGNED",
        "TASK_STATUS_UPDATED",
        "LEAVE_SUBMITTED",
        "LEAVE_APPROVED",
        "LEAVE_REJECTED",
        "ANNOUNCEMENT_CREATED",
        "ATTENDANCE_CHECK_IN",
        "ATTENDANCE_CHECK_OUT",
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

notificationSchema.pre("validate", function (next) {
  const hasUser = !!this.recipient;
  const hasCompany = !!this.recipientCompany;
  if (!hasUser && !hasCompany) {
    return next(
      new Error("Notification must set either recipient or recipientCompany")
    );
  }
  if (hasUser && hasCompany) {
    return next(
      new Error("Notification cannot set both recipient and recipientCompany")
    );
  }
  next();
});

notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ companyId: 1, recipient: 1, createdAt: -1 });
notificationSchema.index({
  recipientCompany: 1,
  read: 1,
  createdAt: -1,
});
notificationSchema.index({
  companyId: 1,
  recipientCompany: 1,
  createdAt: -1,
});

export const Notification = mongoose.model("Notification", notificationSchema);
