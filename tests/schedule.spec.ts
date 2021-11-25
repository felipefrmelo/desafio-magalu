import { v4 } from "uuid";
import { Schedule } from "../src/schedule";

describe("Schedule", () => {
  it("should be created with status pending", () => {
    const cmd = {
      id: v4(),
      message: "Hello World",
      to: "42",
      channel: "sms",
      schedule_at: "2021-11-24T00:00:00.000Z",
    };
    const schedule = Schedule.create(cmd);

    expect(schedule.status).toBe("pending");
  });
});
