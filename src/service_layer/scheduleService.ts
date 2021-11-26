import { CreateSchedule } from "../domain/commands";
import { ScheduleRepository } from "../adapters/repository";
import { Schedule } from "../domain/schedule";
import { NotFoundError } from "./errors";

export class ScheduleService {
  constructor(private repository: ScheduleRepository) {}

  async createSchedule(schedule: CreateSchedule): Promise<void> {
    const newSchedule = Schedule.create(schedule);
    return this.repository.save(newSchedule);
  }

  async getSchedule(id: string): Promise<Schedule> {
    const schedule = await this.repository.getById(id);
    if (!schedule) {
      throw new NotFoundError();
    }
    return schedule;
  }

  async cancelSchedule(id: string): Promise<void> {
    const schedule = await this.getSchedule(id);

    schedule.cancel();
    await this.repository.save(schedule);
  }
}
