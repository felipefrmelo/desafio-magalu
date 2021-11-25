import request from "supertest";
import { Express } from "express";
import server from "../../src/app";
import { Status } from "../../src/domain/enums";
import { makeCreateScheduleCommand } from "../utils";

describe("API", () => {
  let app: Express;

  beforeAll(async () => {
    app = await server.init();
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
});
