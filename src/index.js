import "dotenv/config";

import connectDb from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;

connectDb()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MONGODB connection failed:", error);
    process.exit(1);
  });
