import request from "supertest";
import { Express } from "express";
import server from "../../src/entrypoint/app";
import { Status } from "../../src/domain/enums";
import { makeCreateScheduleCommand } from "../utils";
import { disconnect, makeService } from "../../src/entrypoint/helper";
import { v4 } from "uuid";

describe("API", () => {
  let app: Express;

  beforeAll(async () => {
    app = await server.init();
  });
  afterAll(async () => {
    await disconnect();
  });

  it("should return 201 when schedule a message", async () => {
    const cmd = makeCreateScheduleCommand();
    const response = await request(app).post("/schedule").send(cmd);
    expect(response.status).toBe(201);
  });

  it("should get a scheduled message", async () => {
    const cmd = makeCreateScheduleCommand();
    await request(app).post("/schedule").send(cmd);
    const response = await request(app).get(`/schedule/${cmd.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...cmd,
      status: Status.PENDING,
    });
  });

  it("should cancel a scheduled message", async () => {
    const cmd = makeCreateScheduleCommand();
    await request(app).post("/schedule").send(cmd);
    const response = await request(app).put(`/schedule/${cmd.id}/cancel`);
    expect(response.status).toBe(200);

    const scheduleCancelled = await request(app).get(`/schedule/${cmd.id}`);
    expect(scheduleCancelled.status).toBe(200);
    expect(scheduleCancelled.body).toEqual({
      ...cmd,
      status: Status.CANCELLED,
    });
  });

  it("should return 404  not found when get a schedule that does not exists", async () => {
    const id = v4();
    const response = await request(app).get(`/schedule/${id}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: [{ message: "Not found" }],
    });
  });

  it("should return 400 when schedule a message with invalid parameters", async () => {
    const response = await request(app).post("/schedule").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          field: "id",
          message: "Id is required",
        },
        {
          field: "recipient",
          message: "Recipient is required",
        },
        {
          field: "message",
          message: "Message is required",
        },
        {
          field: "scheduled_at",
          message: "Scheduled_at is required",
        },
        {
          field: "channel",
          message: "Channel is required",
        },
      ],
    });
  });
});
