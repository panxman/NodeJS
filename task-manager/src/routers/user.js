const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/authentication");

const router = new express.Router();

// Create User
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// User Logout All - Remove all tokens
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Get User's profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Update user
router.patch("/users/me", auth, async (req, res) => {
  const _id = req.user._id;
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
    updates.forEach(update => req.user[update] = req.body[update]);

    await req.user.save();    

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete User
router.delete("/users/me", auth, async (req, res) => {
  const _id = req.user._id;

  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
