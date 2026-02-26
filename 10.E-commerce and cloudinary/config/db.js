
import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB Connected");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDB;
