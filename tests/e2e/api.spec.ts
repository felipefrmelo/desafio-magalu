import request from "supertest";
import { Express } from "express";
import server from "../../src/entrypoint/app";
import { Status } from "../../src/domain/enums";
import { makeCreateScheduleCommand } from "../utils";
import { disconnect } from "../../src/entrypoint/helper";
import { v4 } from "uuid";
import { CreateSchedule } from "../../src/domain/commands";

async function post_schedule(app: Express, cmd: CreateSchedule) {
  const response = await request(app).post("/schedule").send(cmd);
  expect(response.status).toBe(201);

  const body = response.body;

  expect(body.id).toBeDefined();
  expect(body.status).toBe(Status.PENDING);
  expect(body.message).toBe(cmd.message);
  expect(body.scheduled_at).toBe(cmd.scheduled_at);
  expect(body.recipient).toBe(cmd.recipient);
  return body;
}

describe("API", () => {
  let app: Express;

  beforeAll(async () => {
    app = await server.init();
  });
  afterAll(async () => {
    await disconnect();
  });

  it("should get a scheduled message", async () => {
    const cmd = makeCreateScheduleCommand();
    const newSchedule = await post_schedule(app, cmd);
    const response = await request(app).get(`/schedule/${newSchedule.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...cmd,
      status: Status.PENDING,
      id: newSchedule.id,
    });
  });

  it("should cancel a scheduled message", async () => {
    const cmd = makeCreateScheduleCommand();

    const newSchedule = await post_schedule(app, cmd);
    const response = await request(app).put(
      `/schedule/${newSchedule.id}/cancel`
    );
    expect(response.status).toBe(200);

    const scheduleCancelled = await request(app).get(
      `/schedule/${newSchedule.id}`
    );
    expect(scheduleCancelled.status).toBe(200);
    expect(scheduleCancelled.body).toEqual({
      ...cmd,
      status: Status.CANCELLED,
      id: newSchedule.id,
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
          message: "Channel is required (SMS, EMAIL, WHATSAPP, PUSH)",
        },
      ],
    });
  });

  it("should return 400 when get a schedule with invalid parameters", async () => {
    const response = await request(app).get("/schedule/invalid-id");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [{ message: "Invalid id" }],
    });
  });
});
