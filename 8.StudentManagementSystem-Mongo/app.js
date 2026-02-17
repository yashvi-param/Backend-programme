import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./db/mongoose.js";
import studentRouter from "./routers/studentRouter.js";

const app = express();

app.use(express.json());

app.use("students", studentRouter);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

// undefined routes

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = process.env.port || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();