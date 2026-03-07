import mongoose, { Schema } from "mongoose";

const resetTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 15 * 60 * 1000),
      expires: 0,
    },
  },
  { timestamps: true }
);

export const ResetToken = mongoose.model("ResetToken", resetTokenSchema);
