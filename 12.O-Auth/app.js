import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";
import  Session  from "express-session";
import profileRoutes from "./routes/profileRoutes.js"

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(Session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
    maxAge: 24 * 60 * 60 * 1000,
   }, // Set to true if using HTTPS
})
);


app.use(passport.session());
app.use(passport.initialize());

app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("home");
});

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error " });
});

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();



