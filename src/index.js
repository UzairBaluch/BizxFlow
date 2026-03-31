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

await connectDb();
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
