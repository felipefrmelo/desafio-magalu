import { CreateSchedule } from "../domain/commands";
import { ScheduleRepository } from "../adapters/repository";
import { Schedule } from "../domain/schedule";
import { BadRequestError, NotFoundError } from "./errors";
import { isValidId } from "../domain/validation";

export class ScheduleService {
  constructor(private repository: ScheduleRepository) {}

  async createSchedule(schedule: CreateSchedule): Promise<Schedule> {
    const newSchedule = Schedule.create(schedule);
    await this.repository.save(newSchedule);
    return newSchedule;
  }

  async getSchedule(id: string): Promise<Schedule> {
    this.ensureIsValidId(id);

    const schedule = await this.repository.getById(id);
    if (!schedule) {
      throw new NotFoundError();
    }
    return schedule;
  }

  async cancelSchedule(id: string): Promise<void> {
    this.ensureIsValidId(id);

    const schedule = await this.getSchedule(id);

    schedule.cancel();
    await this.repository.save(schedule);
  }

  private ensureIsValidId(id: string): void {
    if (!isValidId(id)) {
      throw new BadRequestError("Invalid id");
    }
  }
}
