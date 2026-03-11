import "dotenv/config";

import connectDb from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;

// Start server first so Railway gets a response (avoids 502); then connect DB
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at : ${PORT}`);
  connectDb().catch((error) => {
    console.error("MONGODB connection failed:", error);
    process.exit(1);
  });
});
