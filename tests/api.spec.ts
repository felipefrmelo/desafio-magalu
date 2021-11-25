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

  it("should get a scheduled message", async () => {
    const id = v4();
    await request(app).post("/schedule").send({
      id,
      to: "42",
      message: "Hello World",
      scheduled_at: "2021-11-24T00:00:00.000Z",
      channel: "sms",
    });
    const response = await request(app).get(`/schedule/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id,
      to: "42",
      message: "Hello World",
      scheduled_at: "2021-11-24T00:00:00.000Z",
      channel: "sms",
      status: "pending",
    });
  });
});
