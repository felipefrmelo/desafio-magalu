import "reflect-metadata";
import {
  Column,
  Entity,
  getConnectionManager,
  getRepository,
  PrimaryColumn,
} from "typeorm";
import { Schedule } from "../domain/schedule";
import { ScheduleRepository } from "./repository";

import { config } from "../config";
import { Channel, Status } from "../domain/enums";

@Entity("schedules")
export class ScheduleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  recipient: string;

  @Column()
  message: string;

  @Column()
  scheduled_at: Date;

  @Column({
    type: "enum",
    enum: Channel,
    default: Channel.SMS,
  })
  channel: Channel;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  constructor(
    id: string,
    recipient: string,
    message: string,
    scheduledAt: Date,
    channel: Channel,
    status: Status
  ) {
    this.id = id;
    this.recipient = recipient;
    this.message = message;
    this.scheduled_at = scheduledAt;
    this.channel = channel;
    this.status = status;
  }

  toDomain(): Schedule {
    return new Schedule(
      this.id,
      this.recipient,
      this.message,
      new Date(this.scheduled_at),
      this.channel,
      this.status
    );
  }

  static fromDomain(schedule: Schedule): ScheduleEntity {
    return new ScheduleEntity(
      schedule.id,
      schedule.recipient,
      schedule.message,
      schedule.scheduled_at,
      schedule.channel,
      schedule.status
    );
  }
}

export class TypeOrmRepository implements ScheduleRepository {
  async getById(id: string): Promise<Schedule | undefined> {
    const schedule = await getRepository(ScheduleEntity).findOne(id);
    return schedule ? schedule.toDomain() : undefined;
  }
  async save(schedule: Schedule): Promise<void> {
    const scheduleEntity = ScheduleEntity.fromDomain(schedule);

    await getRepository(ScheduleEntity).upsert(scheduleEntity, ["id"]);
  }
}

const connectionManager = getConnectionManager();

export const connection = connectionManager.create({
  type: "postgres",
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  entities: [ScheduleEntity],
  synchronize: true,
});
