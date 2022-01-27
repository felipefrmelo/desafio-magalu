import { FieldError } from "../service_layer/errors";
import { CreateSchedule } from "./commands";
import { Channel } from "./enums";

export const isValidId = (id: string): boolean => {
  return !!id && id.length === 36;
};

export const validateCreateScheduleCommand = (
  cmd: CreateSchedule
): FieldError[] => {
  const errors: FieldError[] = [];

  if (!cmd.recipient) {
    errors.push({ msg: "Recipient is required", field: "recipient" });
  }

  if (!cmd.message) {
    errors.push({ msg: "Message is required", field: "message" });
  }

  if (!cmd.scheduled_at) {
    errors.push({ msg: "Scheduled_at is required", field: "scheduled_at" });
  }

  if (!cmd.channel || !Channel[cmd.channel]) {
    errors.push({
      msg: `Channel is required (${Object.keys(Channel).join(", ")})`,
      field: "channel",
    });
  }

  return errors;
};
