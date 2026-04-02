import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/** Host part of URI only (no credentials) — for logs when debugging deploys. */
function mongoUriHostForLog(uri) {
  const m = String(uri).match(/^mongodb(\+srv)?:\/\/(?:[^@]*@)?([^/?#]+)/i);
  return m?.[2] ?? null;
}

const connectDb = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing or empty (check .env or Railway Variables)."
    );
  }

  const hostHint = mongoUriHostForLog(uri);
  if (hostHint) {
    console.log(`[BizxFlow] MongoDB URI host: ${hostHint} (dbName=${DB_NAME})`);
  }
  if (/<\s*db_password\s*>/i.test(uri) || /<password>/i.test(uri)) {
    console.error(
      "[BizxFlow] MONGODB_URI still contains a placeholder; use the real DB password from Atlas → Database Access."
    );
  }

  const connectionInstance = await mongoose.connect(uri, {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: 15_000,
  });
  console.log(
    `\n MongoDb connected! DB Host: ${connectionInstance.connection.host} db=${DB_NAME}`
  );
};
export default connectDb;
