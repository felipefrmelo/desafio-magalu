import express from "express";
import cors from "cors";
import { newClient, PostgresRepository } from "./adapters/postgresRepository";
import { ScheduleService } from "./service_layer/scheduleService";

const app = express();
app.use(express.json());
app.use(cors());

async function init() {
  const client = await newClient();

  const postgresRepository = new PostgresRepository(client);
  const service = new ScheduleService(postgresRepository);

  app.post("/schedule", async (req, res) => {
    const { body } = req;
    await service.createSchedule(body);
    return res.status(201).send();
  });

  app.get("/schedule/:id", async (req, res) => {
    const { id } = req.params;
    const schedule = await service.getSchedule(id);
    return res.status(200).json(schedule);
  });

  app.put("/schedule/:id/cancel", async (req, res) => {
    const { id } = req.params;
    await service.cancelSchedule(id);
    return res.status(200).send();
  });
  return app;
}

async function start(port: number = 8080) {
  await init();
  app.listen(port, () => {
    console.log("Server started on port ", port);
  });
}

export default { init, start };
