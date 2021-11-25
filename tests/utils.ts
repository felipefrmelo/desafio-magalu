import { v4 } from "uuid";
import { Channel } from "../src/domain/enums";

export function makeCreateScheduleCommand(
  id = v4(),
  channel = Channel.SMS,
  message = "Hello World",
  recipient = "123456789",
  scheduled_at = new Date().toISOString()
) {
  return {
    id,
    channel,
    message,
    recipient,
    scheduled_at,
  };
}
