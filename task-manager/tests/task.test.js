const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, userTwo, taskOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Run a test for creating a task",
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const taskCount = response.body.length;
    expect(taskCount).toEqual(2);
});

test("Should delete user's task", async () => {
    await request(app)
        .delete("/tasks/" + taskOne._id)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const task = await Task.findById(taskOne._id);
    expect(task).toBeNull();
});

test("Should fail to delete other users' tasks", async () => {
    await request(app)
        .delete("/tasks/" + taskOne._id)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});

test("Should only show completed tasks", async () => {
    const response = await request(app)
        .get("/tasks?completed=true")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
});
