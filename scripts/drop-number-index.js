import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";

async function dropIndex() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    await mongoose.connection.db.collection("users").dropIndex("number_1");
    console.log("Dropped number_1 index");
  } catch (err) {
    if (err.code === 27) {
      console.log("Index does not exist, nothing to drop");
    } else {
      console.error(err);
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

dropIndex();
