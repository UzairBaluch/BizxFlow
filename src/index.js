import "dotenv/config";
import { createServer } from "node:http";
import connectDb from "./db/index.js";
import { app } from "./app.js";
import { initSocketIO } from "./socket/io.js";

process.on("uncaughtException", (err) => {
  console.error("[BizxFlow] uncaughtException", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.error("[BizxFlow] unhandledRejection", reason, p);
});

const server = createServer(app);

const PORT = process.env.PORT || 4000;
initSocketIO(server);

try {
  await connectDb();
} catch (err) {
  console.error("[BizxFlow] MongoDB connection failed:", err.message);
  console.error(
    "Checklist: (1) Railway Variables → MONGODB_URI exact name, new deploy after save. (2) Atlas same project as cluster → Network Access 0.0.0.0/0 Active. (3) Cluster not paused. (4) Password URL-encoded if it contains @ # % / : . (5) See log line 'MongoDB URI host:' — must match your cluster hostname."
  );
  process.exit(1);
}
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
