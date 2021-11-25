import pg from "pg";
import {
  newClient,
  PostgresRepository,
} from "../../src/adapters/postgresRepository";
import { Schedule } from "../../src/domain/schedule";
import { makeCreateScheduleCommand } from "../utils";

describe("PostgresURLRepository", () => {
  let client: pg.Client;
  let postgresRepository: PostgresRepository;

  beforeAll(async () => {
    client = await newClient();
  });

  afterAll(async () => {
    await client.end();
  });

  beforeEach(async () => {
    postgresRepository = new PostgresRepository(client);
  });

  afterEach(async () => {
    await client.query("DELETE FROM schedules");
  });

  it("should create and find a new schedule", async () => {
    const cmd = makeCreateScheduleCommand();
    const schedule = Schedule.create(cmd);

    await postgresRepository.save(schedule);

    const result = await postgresRepository.getById(schedule.id);

    expect(result).toBeDefined();
    expect(result!.id).toBe(schedule.id);
    expect(result!.message).toBe(schedule.message);
    expect(result!.scheduled_at.toISOString()).toBe(
      schedule.scheduled_at.toISOString()
    );
    expect(result!.recipient).toBe(schedule.recipient);
    expect(result!.status).toBe(schedule.status);
    expect(result!.channel).toBe(schedule.channel);
  });

  it("should update a schedule", async () => {
    const cmd = makeCreateScheduleCommand();
    const schedule = Schedule.create(cmd);

    await postgresRepository.save(schedule);

    const result = await postgresRepository.getById(schedule.id);

    if (!result) {
      throw new Error("Schedule not found");
    }

    result.cancel();

    await postgresRepository.save(result);

    const updatedResult = await postgresRepository.getById(schedule.id);

    expect(updatedResult!.status).toBe(result.status);
  });
});
