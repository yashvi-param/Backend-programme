import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import providerRouter from "./routes/providerRoutes.js";

import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

const app = express();

app.use(express.json());

app.use(helmet());

app.use(rateLimit());

app.use(hpp());

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.use("/booking", bookingRouter);

app.use("/provider", providerRouter);

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message } || "internal server error");
});

const port = process.env.PORT || 5000;

console.log("port", port);

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();

// import Service from "./model/Services.js";
// import Category from "./model/Category.js";

// relationship between service and category

// const check = async () => {
//   // using manually
//   // const service = await Service.findById("69d48aa2627ce6307336a653");

//   // const category = await Category.findById(service.category);

//   // console.log(category);

//   // using populate

//   //  const service = await Service.findById("69d48aa2627ce6307336a653").populate(
//   //   "category","name -_id",
//   // );

//   // console.log(service);

//   // now using virtual finding the all service in category

//   const category = await Category.findById("69d33796f0f31525cbe41138").populate(
//     "services", "name description price -_id -category"
//   );

//   console.log(category.services);
// };

// check();
