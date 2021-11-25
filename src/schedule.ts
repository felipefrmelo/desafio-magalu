import { CreateSchedule } from "./commands";

export class Schedule {
  constructor(
    public id: string,
    public recipient: string,
    public message: string,
    public scheduled_at: Date,
    public channel: string,
    public status: string
  ) {}

  static create(cmd: CreateSchedule): Schedule {
    return new Schedule(
      cmd.id,
      cmd.recipient,
      cmd.message,
      new Date(cmd.scheduled_at),
      cmd.channel,
      "pending"
    );
  }
}
