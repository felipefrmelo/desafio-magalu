import pg from "pg";
import fs from "fs";
import { config } from "../config";
import { Schedule } from "../domain/schedule";
import { ScheduleRepository } from "./repository";

export class PostgresRepository implements ScheduleRepository {
  constructor(private connection: pg.Client) {}

  async getById(id: string): Promise<Schedule | undefined> {
    const result = await this.connection.query(
      "SELECT * FROM schedules WHERE id = $1",
      [id]
    );

    const schedule = result.rows[0];

    return result.rowCount > 0
      ? new Schedule(
          schedule.id,
          schedule.recipient,
          schedule.message,
          new Date(schedule.scheduled_at),
          schedule.channel,
          schedule.status
        )
      : undefined;
  }

  async save(schedule: Schedule): Promise<void> {
    await this.connection.query(
      `INSERT INTO schedules (id, message, recipient, status, channel, scheduled_at) 
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id)
      DO UPDATE SET message = $2, recipient = $3, status = $4, channel = $5, scheduled_at = $6`,
      [
        schedule.id,
        schedule.message,
        schedule.recipient,
        schedule.status,
        schedule.channel,
        schedule.scheduled_at,
      ]
    );
  }
}

export const newClient = async () => {
  const client = new pg.Client(config.db);
  const sql = fs.readFileSync("./sql/create_table_schedules.sql").toString();

  await client.connect();
  await client.query(sql);
  return client;
};
