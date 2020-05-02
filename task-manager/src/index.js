// NPM modules
const express = require("express");
// local files
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// Parse incoming JSON into an object
app.use(express.json());

// ~~~ HTTP Methods ~~~

// Create User
app.post("/users", (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Create Task
app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// ~~~ End ~~~

app.listen(port, () => {
    console.log("Server is up on port: " + port);
});