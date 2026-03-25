import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";

let io = null;

function toPayload(notificationDoc) {
  if (!notificationDoc) return null;
  return typeof notificationDoc.toObject === "function"
    ? notificationDoc.toObject()
    : { ...notificationDoc };
}

export function initSocketIO(httpServer) {
  const corsOrigin = process.env.CORS_ORIGIN || "*";

  io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        (typeof socket.handshake.query?.token === "string"
          ? socket.handshake.query.token
          : undefined);

      if (!token?.trim()) {
        return next(new Error("Unauthorized: missing token"));
      }

      const decoded = jwt.verify(token.trim(), process.env.ACCESS_TOKEN_SECRET);

      if (decoded?.type === "company") {
        const company = await Company.findById(decoded._id).select("-password");
        if (!company) {
          return next(new Error("Unauthorized: company not found"));
        }
        socket.join(`company:${company._id.toString()}`);
        return next();
      }

      if (decoded?.type !== "user") {
        return next(new Error("Unauthorized: invalid token type"));
      }

      const user = await User.findById(decoded._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        return next(new Error("Unauthorized: user not found"));
      }

      socket.join(`user:${user._id.toString()}`);
      next();
    } catch (err) {
      next(new Error(err?.message || "Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("[BizxFlow] socket connected", socket.id);
    socket.on("disconnect", () => {
      console.log("[BizxFlow] socket disconnected", socket.id);
    });
  });

  return io;
}

export function emitNotificationToUser(recipientUserId, notificationDoc) {
  if (!io || !notificationDoc) return;
  const id =
    recipientUserId != null && typeof recipientUserId.toString === "function"
      ? recipientUserId.toString()
      : String(recipientUserId);
  const payload = toPayload(notificationDoc);
  io.to(`user:${id}`).emit("notification", payload);
}

export function emitNotificationToCompany(companyId, notificationDoc) {
  if (!io || !notificationDoc) return;
  const id =
    companyId != null && typeof companyId.toString === "function"
      ? companyId.toString()
      : String(companyId);
  const payload = toPayload(notificationDoc);
  io.to(`company:${id}`).emit("notification", payload);
}

export function getIO() {
  return io;
}
