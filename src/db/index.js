import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing or empty (check .env or Railway Variables)."
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
