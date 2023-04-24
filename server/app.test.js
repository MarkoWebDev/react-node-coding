const request = require("supertest");
const app = require("./app");
const encoder = require("./encoder/encoder");

describe("POST /encoder/token", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app)
      .post("/encoder/token")
      .set("Authorization", "xyz0987654321")
      .send({
        query: "XXXYYYYZZQXX",
      });
    const encoded = encoder("XXXYYYYZZQXX");
    expect(response.status).toBe(200);
    expect(response.body).toBe(encoded);
  });
  test("should return 401 unauthorized", async () => {
    const response = await request(app)
      .post("/encoder/token")
      .set("Authorization", "Unauthorized")
      .send({
        query: "XXXYYYYZZQXX",
      });
    expect(response.status).toBe(401);
    expect(response.body).toBe("Your are not authorized");
  });
});
