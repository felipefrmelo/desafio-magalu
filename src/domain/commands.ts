import { FieldError, RequestValidationError } from "../service_layer/errors";
import { Channel } from "./enums";

export class CreateSchedule {
  constructor(
    public readonly id: string,
    public readonly recipient: string,
    public readonly message: string,
    public readonly scheduled_at: string,
    public readonly channel: Channel
  ) {}

  static fromJson(json: any): CreateSchedule {
    const cmd = new CreateSchedule(
      json.id,
      json.recipient,
      json.message,
      json.scheduled_at,
      json.channel
    );
    const errors = cmd.validate();
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }
    return cmd;
  }

  validate(): FieldError[] {
    const errors: FieldError[] = [];

    if (!this.id) {
      errors.push({ msg: "Id is required", field: "id" });
    }

    if (!this.recipient) {
      errors.push({ msg: "Recipient is required", field: "recipient" });
    }

    if (!this.message) {
      errors.push({ msg: "Message is required", field: "message" });
    }

    if (!this.scheduled_at) {
      errors.push({ msg: "Scheduled_at is required", field: "scheduled_at" });
    }

    if (!this.channel) {
      errors.push({ msg: "Channel is required", field: "channel" });
    }

    return errors;
  }
}
