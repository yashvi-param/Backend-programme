
import mongoose from "mongoose"

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Linkedin")

        console.log("DB connected")

    } catch (error) {
        console.log("MongoDB connection Failed:", error.message)

        process.exit(1)
    }
}

