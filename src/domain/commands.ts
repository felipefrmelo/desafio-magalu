import { RequestValidationError } from "../service_layer/errors";
import { Channel } from "./enums";
import { validateCreateScheduleCommand } from "./validation";

export class CreateSchedule {
  constructor(
    public readonly recipient: string,
    public readonly message: string,
    public readonly scheduled_at: string,
    public readonly channel: Channel
  ) {}

  static fromJson(json: any): CreateSchedule {
    const errors = validateCreateScheduleCommand(json);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    return new CreateSchedule(
      json.recipient,
      json.message,
      json.scheduled_at,
      json.channel
    );
  }
}
