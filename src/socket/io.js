import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

let io = null;

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
        return next(new Error("Unauthorized: user token required"));
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

      const userId = user._id.toString();
      socket.join(`user:${userId}`);
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
  const payload =
    typeof notificationDoc.toObject === "function"
      ? notificationDoc.toObject()
      : { ...notificationDoc };
  io.to(`user:${id}`).emit("notification", payload);
}

export function getIO() {
  return io;
}
