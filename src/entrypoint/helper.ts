import { newClient, PostgresRepository } from "../adapters/postgresRepository";
import { ScheduleService } from "../service_layer/scheduleService";

const client = newClient();

async function makeService() {
  return client.then(async (client) => {
    const postgresRepository = new PostgresRepository(client);
    const service = new ScheduleService(postgresRepository);
    return service;
  });
}

async function disconnect() {
  client.then((client) => client.end());
}

export { makeService, disconnect };
