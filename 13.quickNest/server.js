
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
});

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
