const request = require("supertest");
const server = require("./server");

describe("GET /", () => {
  it("should return 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
  it("should return json", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });
});
