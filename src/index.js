import "dotenv/config";

import connectDb from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;

// Start server first so Railway gets a response; DB connects in background
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at : ${PORT}`);
  connectDb().catch((error) => {
    console.error("MONGODB connection failed:", error);
    // Don't exit – server stays up for / and /health; fix MONGODB_URI and Atlas access
  });
});
