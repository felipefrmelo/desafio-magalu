import { v4 } from "uuid";
import { CreateSchedule } from "./commands";
import { Channel, Status } from "./enums";

export class Schedule {
  constructor(
    public id: string,
    public recipient: string,
    public message: string,
    public scheduled_at: Date,
    public channel: Channel,
    public status: Status
  ) {}

  static create(cmd: CreateSchedule): Schedule {
    const id = v4();
    return new Schedule(
      id,
      cmd.recipient,
      cmd.message,
      new Date(cmd.scheduled_at),
      cmd.channel,
      Status.PENDING
    );
  }

  cancel(): void {
    this.status = Status.CANCELLED;
  }
}
