import request from "supertest";
import app from "../src/app";
import { v4 } from "uuid";

describe("API", () => {
  it("should return 201 when schedule a message", async () => {
    const response = await request(app).post("/schedule").send({
      id: v4(),
      to: "42",
      message: "Hello World",
      scheduled_at: "2021-11-24T00:00:00.000Z",
      channel: "sms",
    });
    expect(response.status).toBe(201);
  });
});
