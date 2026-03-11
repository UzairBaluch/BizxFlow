import "dotenv/config";

import connectDb from "./db/index.js";
import { app } from "./app.js";

process.on("uncaughtException", (err) => {
  console.error("[BizxFlow] uncaughtException", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.error("[BizxFlow] unhandledRejection", reason, p);
});

const PORT = process.env.PORT || 4000;

console.log("[BizxFlow] Starting, PORT=" + PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log("[BizxFlow] Server is running at : " + PORT);
  connectDb().catch((error) => {
    console.error("MONGODB connection failed:", error);
  });
});
