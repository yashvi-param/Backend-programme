import express from "express";
import HttpError from "./middleware/HttpError.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});


let taskList = [
    {
        id: 1,
        task: "read",
        description: "today i read new book"
    },
    {
        id: 2,
        task: "write",
        description: "today i write book"
    },
    {
        id: 3,
        task: "complete",
        description: "complete your work today"
    },
]
// get all tasks
app.get("/taskList", (req, res) => {

    if (taskList.length <= 0) {
        return res.status(200).json("task list is empty");
    }
    res.status(200).json({ message: "task list retrieved successfully ", taskList });
});


//getting data using specific id
app.get("/taskList/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = taskList.find((t) => t.id === id);
    if (!task) {
        return res.status(404).json("task data not found");
    }
    res.status(200).json(task);

});
//adding task data
app.post("/addTask", (req, res) => {
    const { task, description } = req.body; //for data extract
    const newTaskData = {
        id: new Date().getTime(),
        task,
        description
    }//data add

    taskList.push(newTaskData);

    res.status(201).json({
        message: "new task added",
        newTaskData
    })
})

//place AFTER all routes
app.use((req, res, next) => {
    next(new HttpError("requested route not found", 404));
})

//centralize error handling
app.use((error, req, res, next) => {
    if (req.headersSent) {
        next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
});

const port = 5001;

app.listen(port, () => {
    console.log("server running on port", port);
})