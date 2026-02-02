import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


let StudentList = [
    { id: 1, name: "jordan" },
    { id: 2, name: "smith" }
];

// SHOW STUDENT LIST
app.get("/", (req, res) => {
    res.render("index", { students: StudentList });
});

// SHOW ADD PAGE
app.get("/add", (req, res) => {
    res.render("add");
});

// ADD STUDENT
app.post("/add-student", (req, res) => {
    const { name } = req.body;

    StudentList.push({
        id: StudentList.length + 1,
        name: name
    });

    res.redirect("/");
});

const port = 5000;
app.listen(port, () => {
    console.log("server running on port", port);
});