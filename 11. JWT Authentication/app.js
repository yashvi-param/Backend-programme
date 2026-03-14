import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

// undefined route handling

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

// centralize error

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json(error.message || "internal server error");
});

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();