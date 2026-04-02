import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/** Host part of URI only (no credentials) — for logs when debugging deploys. */
function mongoUriHostForLog(uri) {
  const m = String(uri).match(/^mongodb(\+srv)?:\/\/(?:[^@]*@)?([^/?#]+)/i);
  return m?.[2] ?? null;
}

/** Strip whitespace; remove accidental wrapping quotes from dashboard paste (e.g. Railway). */
function normalizeMongoUri(raw) {
  let u = String(raw ?? "").trim();
  if (
    (u.startsWith('"') && u.endsWith('"')) ||
    (u.startsWith("'") && u.endsWith("'"))
  ) {
    u = u.slice(1, -1).trim();
  }
  return u;
}

const connectDb = async () => {
  const uri = normalizeMongoUri(process.env.MONGODB_URI);
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing or empty (check .env or Railway Variables)."
    );
  }

  const hostHint = mongoUriHostForLog(uri);
  if (hostHint) {
    console.log(`[BizxFlow] MongoDB URI host: ${hostHint} (dbName=${DB_NAME})`);
  }
  // Length helps verify Railway didn’t truncate; compare to local .env value length (don’t log the URI).
  console.log(
    `[BizxFlow] MONGODB_URI chars=${uri.length} srv=${uri.startsWith("mongodb+srv://")}`
  );
  if (/<\s*db_password\s*>/i.test(uri) || /<password>/i.test(uri)) {
    console.error(
      "[BizxFlow] MONGODB_URI still contains a placeholder; use the real DB password from Atlas → Database Access."
    );
  }

  const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT);
  const connectionInstance = await mongoose.connect(uri, {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: onRailway ? 30_000 : 15_000,
  });
  console.log(
    `\n MongoDb connected! DB Host: ${connectionInstance.connection.host} db=${DB_NAME}`
  );
};
export default connectDb;
