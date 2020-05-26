// NPM modules
const express = require("express");
// local files
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// Parse incoming JSON into an object
app.use(express.json());
// Use the Routers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
