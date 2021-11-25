import { CreateSchedule } from "../domain/commands";
import { ScheduleRepository } from "../adapters/repository";
import { Schedule } from "../domain/schedule";

export class ScheduleService {
  constructor(private repository: ScheduleRepository) {}

  async createSchedule(schedule: CreateSchedule): Promise<void> {
    const newSchedule = Schedule.create(schedule);
    return this.repository.save(newSchedule);
  }

  async getSchedule(id: string): Promise<Schedule | undefined> {
    return this.repository.getById(id);
  }

  async cancelSchedule(id: string): Promise<void> {
    const schedule = await this.getSchedule(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    schedule.cancel();
    await this.repository.save(schedule);
  }
}
