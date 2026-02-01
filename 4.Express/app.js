
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("Hello from Express + Node");
});

app.get("/about", (req, res) => {
  res.json( "This is about page" );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
