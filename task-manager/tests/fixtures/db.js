const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneID,
    name: "Mike",
    email: "mike@example.com",
    password: "MyPass123",
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET),
    }],
};

const userTwoID = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoID,
    name: "Panos",
    email: "panos@example.com",
    password: "Panikas4",
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET),
    }],
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First Task",
    completed: false,
    owner: userOneID
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second Task",
    completed: true,
    owner: userOneID
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third Task",
    completed: false,
    owner: userTwoID
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneID,
    userOne,
    userTwo,
    userTwoID,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};
