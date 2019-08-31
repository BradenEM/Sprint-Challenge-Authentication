const request = require("supertest");
const server = require("./auth-router");
const db = require("../database/dbConfig");
const Users = require("./authHelper");

describe("POST api/auth/register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should register 2 users", async () => {
    await Users.add({ username: "test", password: "password123" });
    await Users.add({ username: "test2", password: "password123" });

    const database = await db("users");
    expect(database).toHaveLength(2);
  });

  it("should be json", async () => {
    await Users.add({ username: "test", password: "password123" });

    const user = await db("users").where({ id: 1 });
    expect(user).toBeTruthy();
  });

  //  it("should return 201", async () => {
  //     let user = {
  //       username: "test",
  //       password: "password123"
  //     };

  //     let res = await request(server)
  //       .post("/register")
  //       .send(user);
  //     expect(res.status).toBe(201);
  //   });
});

describe("POST api/auth/login", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should return status 200", async () => {
    await Users.add({ username: "test", password: "password123" });
    let user = {
      username: "test"
    };

    const res = await request(server)
      .post("/login")
      .send(user);
    console.log(res);
  });
});
