import { Channel } from "./enums";

export type CreateSchedule = {
  id: string;
  recipient: string;
  message: string;
  scheduled_at: string;
  channel: Channel;
};
