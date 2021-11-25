import request from "supertest";
import app from "../../src/app";
import { v4 } from "uuid";
import { Channel, Status } from "../../src/domain/enums";
import { makeCreateScheduleCommand } from "../utils";

describe("API", () => {
  beforeAll(async () => {
    await app.init();
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
});
