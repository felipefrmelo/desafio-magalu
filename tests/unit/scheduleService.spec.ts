import { Status } from "../../src/domain/enums";
import { ScheduleRepository } from "../../src/adapters/repository";
import { Schedule } from "../../src/domain/schedule";
import { ScheduleService } from "../../src/service_layer/scheduleService";
import { makeCreateScheduleCommand } from "../utils";

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
    const newSchedule = await service.createSchedule(cmd);
    expect(repository.schedules.length).toBe(1);
    expect(newSchedule.id).toBeTruthy();
  });

  it("should can get a schedule", async () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    const cmd = makeCreateScheduleCommand();

    const newSchedule = await service.createSchedule(cmd);
    const schedule = await service.getSchedule(newSchedule.id);
    expect(schedule).toBeTruthy();
  });

  it("should can cancel a schedule", async () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    const cmd = makeCreateScheduleCommand();
    const newSchedule = await service.createSchedule(cmd);

    await service.cancelSchedule(newSchedule.id);

    const schedule = await service.getSchedule(newSchedule.id);
    expect(schedule?.status).toBe(Status.CANCELLED);
  });
});
