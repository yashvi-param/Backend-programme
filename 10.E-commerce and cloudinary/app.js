import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

dotenv.config({path: "./.env"});

console.log("Port:", process.env.PORT);