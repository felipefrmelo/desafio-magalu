import { newClient, PostgresRepository } from "../adapters/postgresRepository";
import { ScheduleService } from "../service_layer/scheduleService";

const client = newClient();

async function makeService() {
  return client.then(async (c) => {
    const postgresRepository = new PostgresRepository(c);
    const service = new ScheduleService(postgresRepository);
    return service;
  });
}

async function disconnect() {
  return client.then((c) => c.end());
}

export { makeService, disconnect };
