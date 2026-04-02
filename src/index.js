import "dotenv/config";
import dns from "node:dns";
import { createServer } from "node:http";
import connectDb from "./db/index.js";

// Railway (and some clouds) can prefer IPv6; Atlas SRV often works more reliably with IPv4 first.
if (process.env.RAILWAY_ENVIRONMENT) {
  try {
    dns.setDefaultResultOrder("ipv4first");
    console.log("[BizxFlow] DNS result order: ipv4first (Railway)");
  } catch {
    /* ignore on very old Node */
  }
}
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
