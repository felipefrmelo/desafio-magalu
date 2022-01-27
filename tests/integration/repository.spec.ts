import {
  connection,
  TypeOrmRepository,
} from "../../src/adapters/typeOrmRepository";
import { Schedule } from "../../src/domain/schedule";
import { makeCreateScheduleCommand } from "../utils";

describe("PostgresURLRepository", () => {
  let sut: TypeOrmRepository;

  beforeAll(async () => {
    await connection.connect();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    sut = new TypeOrmRepository();
  });

  afterEach(async () => {
    await connection.query("DELETE FROM schedules");
  });

  it("should create and find a new schedule", async () => {
    const cmd = makeCreateScheduleCommand();
    const schedule = Schedule.create(cmd);

    await sut.save(schedule);

    const result = await sut.getById(schedule.id);

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

    await sut.save(schedule);

    const result = await sut.getById(schedule.id);

    if (!result) {
      throw new Error("Schedule not found");
    }

    result.cancel();

    await sut.save(result);

    const updatedResult = await sut.getById(schedule.id);

    expect(updatedResult!.status).toBe(result.status);
  });
});
