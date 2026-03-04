
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routers/productRoute.js";

dotenv.config({path:"./.env"});

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

console.log("PORT:", process.env.PORT);

app.get("/", (req, res) => {
  res.status(200).json("Hello from Server....!");
});

app.use("/product", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
