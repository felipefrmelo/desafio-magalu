import { v4 } from "uuid";
import { Schedule } from "../src/schedule";

describe("Schedule", () => {
  it("should be created with status pending", () => {
    const cmd = {
      id: v4(),
      message: "Hello World",
      recipient: "42",
      channel: "sms",
      scheduled_at: "2021-11-24T00:00:00.000Z",
    };
    const schedule = Schedule.create(cmd);

    expect(schedule.status).toBe("pending");
    expect(schedule.id).toBe(cmd.id);
    expect(schedule.message).toBe(cmd.message);
    expect(schedule.recipient).toBe(cmd.recipient);
    expect(schedule.channel).toBe(cmd.channel);
    expect(schedule.scheduled_at.toISOString()).toBe(cmd.scheduled_at);
  });
});
