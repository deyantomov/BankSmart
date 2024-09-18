import mongoose from "mongoose";

export default async function connectToMongoDB() {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/";
  const db = process.env.DB || "dev";

  try {
    await mongoose.connect(mongoURI, { dbName: db });
  } catch (err) {
    throw new Error(`Unable to connect to database: ${err.message}`);
  }

  return "Connected to MongoDB";
}