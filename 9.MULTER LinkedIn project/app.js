
import express from "express";
import connectDB from "./db/mongoose.js";
import HttpError from "./middleware/httpError.js";
import linkedInRoutes from "./routes/LinkedInRoutes.js";

const app = express();

app.use(express.json());

app.use("/linkedin", linkedInRoutes);

// home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to LinkedIn Profile" });
});

// undefined routes
app.use((req, res, next) => {
  next(new HttpError("Route not found", 404));
});

// centralized error handling
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

const port = 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
