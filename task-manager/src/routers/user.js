const express = require("express");
const User = require("../models/user");

const router = new express.Router();

// Create User
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// Get 1 user
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// Update user
router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["name", "email", "password", "age"];

  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  // If the PATCH has values that are not to be updates, throw error
  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." });
  }

  try {
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // Use the normal update instead of findByIdAndUpdate,
    // so Mongoose Middleware pre-save can be run and we can hash the pass
    const user = await User.findById(_id);
    
    updates.forEach(update => user[update] = req.body[update]);

    await user.save();

    if (!user) {
      return res.status(404).send("User not found to update.");
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete User
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
