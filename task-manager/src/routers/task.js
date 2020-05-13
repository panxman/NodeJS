const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/authentication");

const router = new express.Router();

// Create Task
router.post("/tasks", auth, async (req, res) => {
  // Update this to add UserID to a Task
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Get all tasks of a user
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Get 1 task
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Update Task
router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["description", "completed"];

  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  // If the PATCH has values that are not to be updates, throw error
  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." });
  }

  try {
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // Again, use the normal update instead of findByIdAndUpdate,
    // so Mongoose Middleware pre-save can be run
    const task = await Task.findOne({ _id, owner: req.user._id });    

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => task[update] = req.body[update]);

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Task
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
