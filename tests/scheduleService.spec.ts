import { v4 } from "uuid";
import { Channel, Status } from "../src/enums";
import { ScheduleRepository } from "../src/repository";
import { Schedule } from "../src/schedule";
import { ScheduleService } from "../src/scheduleService";

class FakeRepository implements ScheduleRepository {
  constructor(public schedules: Schedule[] = []) {}

  async getById(id: string): Promise<Schedule | undefined> {
    return this.schedules.find((s) => s.id === id);
  }
  async save(schedule: Schedule): Promise<void> {
    this.schedules = this.schedules
      .filter((s) => s.id !== schedule.id)
      .concat(schedule);
  }
}

function makeCreateScheduleCommand(
  id = v4(),
  channel = Channel.SMS,
  message = "Hello World",
  recipient = "123456789",
  scheduled_at = new Date().toISOString()
) {
  return {
    id,
    channel,
    message,
    recipient,
    scheduled_at,
  };
}

describe("ScheduleService", () => {
  it("should be created", () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    expect(service).toBeTruthy();
  });

  it("should can create a schedule", async () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    const cmd = makeCreateScheduleCommand();
    await service.createSchedule(cmd);
    expect(repository.schedules.length).toBe(1);
  });

  it("should can get a schedule", async () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    const cmd = makeCreateScheduleCommand();

    await service.createSchedule(cmd);
    const schedule = await service.getSchedule(cmd.id);
    expect(schedule).toBeTruthy();
  });

  it("should can cancel a schedule", async () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    const cmd = makeCreateScheduleCommand();
    await service.createSchedule(cmd);

    await service.cancelSchedule(cmd.id);

    const schedule = await service.getSchedule(cmd.id);
    expect(schedule?.status).toBe(Status.CANCELLED);
  });
});
