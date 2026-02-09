
import express from  "express";
import HttpError from "./middleware/HttpError.js";


const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json("Hello World");
});

let taskList = [
  {
    id: 1,
    task: "Learn Node.js",
    description: "Understand Express, routing, and middleware"
  },
  {
    id: 2,
    task: "Build EJS CRUD App",
    description: "Create task manager with add, edit, and delete features"
  },
  {
    id: 3,
    task: "Style with CSS",
    description: "Apply clean UI using external CSS file"
  }
];

app.get("/taskList",(req,res)=>{
  
  if(taskList.length <= 0){
    return res.status(200).json("Task list is empty");
  }

  res.status(200).json({message: "Task list data retrieved successfully",taskList});

});


// now getting data using specific id

app.get("/taskList/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json("Task data with this id not found");
  }

  res.status(200).json(task);
});

//adding task data

app.post("/addTask", (req, res) => {
  const { task , description } = req.body;

  const newTaskData = {
    id: new Date().getTime(),
    task,
    description
  };

  taskList.push(newTaskData);

  res.status(201).json({message:"New task added",newTaskData})

});  


// update partial task (PATCH)
app.patch("/updateTask/:id", (req, res) => {

  const id = Number(req.params.id);
  const { task, description } = req.body;

  const existingTask = taskList.find((t) => t.id === id);

  if (!existingTask) {
    return res.status(404).json("Task not found");
  }

  if (task) existingTask.task = task;
  if (description) existingTask.description = description;

  res.status(200).json({
    message: "Task partially updated",
    updatedTask: existingTask
  });
});




// undefined routes handling
app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

// centralize error handling
app.use((error, req, res, next) => {
  if (req.headersSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});



const port=5000;

app.listen(port, () => {
  console.log("server listening on port", port);
});

