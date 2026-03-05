import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import HttpError from "./middleware/HttpError.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "📚 Welcome to Book Store Management System",
  });
});

app.use((req, res, next) => {
  next(new HttpError("Route not found", 404));
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

  } catch (error) {
    console.log("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();