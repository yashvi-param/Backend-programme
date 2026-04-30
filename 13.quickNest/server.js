import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import connectDB from "./config/db.js";

import HttpError from "./middleware/HttpError.js";

import UserRouter from "./router/UserRouter.js";
import adminRouter from "./router/adminRouter.js";
import bookingRouter from "./router/bookingRouter.js"

import providerRouter from "./router/providerRouter.js"

import {rateLimiter} from "./middleware/rateLimit.js"
import helmet from "helmet";
import hpp from "hpp";

const app = express();

app.use(express.json());
app.use(rateLimiter)

app.use(helmet())
app.use(hpp()) 



app.use("/user", UserRouter);
app.use("/admin", adminRouter);
app.use("/booking",bookingRouter)
app.use("/provider",providerRouter)


app.get("/", (req, res, next) => {
  res.status(200).json("Hello from Server....!");
});

app.use((req, res, next) => {
  return next(new HttpError("Requested Route not Founded...!"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.StatusCode || 500)
    .json({ message: error.message } || "Internal Server Error");
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on Port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();

// const check = async () => {
//   //using Manual

//   // const service = await Service.findById("69d65ed232cbb03127ee8503")

//   //   const category = await Category.findById(Service.category)

//   //  console.log("Category",category)

//   //using Populate

//   // const service = await Service.findById("69d67a637c8156122afc94b5").populate("category","name")

//   // console.log("Services",service)

//   //using Virtual

//   const category = await Category.findById("69d65eba32cbb03127ee84fa").populate(
//     "service","name description price -_id -category"
//   );

//   console.log(category.service);
// };

// check();