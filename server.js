import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from server");
});

const port = process.env.PORT || 5000;

console.log("port", port);

async function startServer() {
  try {
  } catch (error) {}
}