
import express from "express"

import HttpError from "./Middleware/HttpError.js";

import connectDB from "./config/db.js";


const app = express()


const port = 5000;


app.get("/", (req, res) => {

    res.status(200).json("Hello from Server..!")
});


app.use((req, res, next) => {

    next(new HttpError("Request Routes Not Found....", 404))
})



app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error)
    }

    res
      .status(error.statuscode || 500)  
      .json({
          message: error.message || "Internal Server Error"
      })
})


async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server Running on Port ${port}`)
        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer();