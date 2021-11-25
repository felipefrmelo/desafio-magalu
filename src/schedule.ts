import { CreateSchedule } from "./commands";

export class Schedule {
  constructor(
    public id: string,
    public message: string,
    public schedule_at: Date,
    public channel: string,
    public status: string
  ) {}

  static create(cmd: CreateSchedule): Schedule {
    return new Schedule(
      cmd.id,
      cmd.message,
      new Date(cmd.schedule_at),
      cmd.channel,
      "pending"
    );
  }
}
