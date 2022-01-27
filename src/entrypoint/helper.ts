import { connection, TypeOrmRepository } from "../adapters/typeOrmRepository";
import { ScheduleService } from "../service_layer/scheduleService";

async function makeService() {
  await connection.connect();
  const typeOrmRepository = new TypeOrmRepository();
  const service = new ScheduleService(typeOrmRepository);
  return service;
}

async function disconnect() {
  await connection.close();
}

export { makeService, disconnect };
