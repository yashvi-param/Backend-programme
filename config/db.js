
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

async function connectDB(){
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    } catch (error) {
        throw new Error("mongoDB connection failed",error.message);
    }
}
export default connectDB;