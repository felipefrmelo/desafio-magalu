import { Schedule } from "./schedule";

export interface ScheduleRepository {
  getById(id: string): Promise<Schedule>;
  save(schedule: Schedule): Promise<Schedule>;
}
