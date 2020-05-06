const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Get 1 task
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task not found.");
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Update Task
router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["description", "completed"];

  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  // If the PATCH has values that are not to be updates, throw error
  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." });
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send("Task not found to update");
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send("Task not found.");
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
