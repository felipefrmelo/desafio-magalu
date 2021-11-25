import { Schedule } from "./schedule";

export interface ScheduleRepository {
  getById(id: string): Promise<Schedule | undefined>;
  save(schedule: Schedule): Promise<void>;
}
