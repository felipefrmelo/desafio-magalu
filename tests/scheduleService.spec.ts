import { ScheduleRepository } from "../src/repository";
import { Schedule } from "../src/schedule";
import { ScheduleService } from "../src/scheduleService";

class FakeRepository implements ScheduleRepository {
  getById(id: string): Promise<Schedule> {
    throw new Error("Method not implemented.");
  }
  save(schedule: Schedule): Promise<Schedule> {
    throw new Error("Method not implemented.");
  }
}

describe("ScheduleService", () => {
  it("should be created", () => {
    const repository = new FakeRepository();
    const service = new ScheduleService(repository);
    expect(service).toBeTruthy();
  });
});
