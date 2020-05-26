const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneID, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up a new user.", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Andrew",
            email: "andrew@example.com",
            password: "MyPass777",
        })
        .expect(201)

    // Assert that the databased was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Andrew",
            email: "andrew@example.com",
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe("MyPass777");
});

test("Should login the user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password,
        })
        .expect(200);

    const user = await User.findById(userOneID);
    expect(user.tokens[1].token).toBe(response.body.token);
});

test("Should not log in nonexistent user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "myemail@example.com",
            password: "nooobas23",
        })
        .expect(400);
});

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test("Should fail to get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
});

test("Should delete user", async () => {
    const response = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
        
    const user = await User.findById(userOneID);
    expect(user).toBeNull();
});

test("Should not delete unauthorized user", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401)
});

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200);

    const user = await User.findById(userOneID);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Panos"
        })
        .expect(200);

    const user = await User.findById(userOneID);
    expect(user.name).toEqual("Panos");
})

test("Should fail to update invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Amsterdam",
        })
        .expect(400);
});