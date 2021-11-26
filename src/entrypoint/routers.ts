import express from "express";
import { ScheduleService } from "../service_layer/scheduleService";

const router = express.Router();

export function routers(service: ScheduleService) {
  router.post("/", async (req, res) => {
    const { body } = req;
    await service.createSchedule(body);
    return res.status(201).send();
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const schedule = await service.getSchedule(id);

    return res.status(200).json(schedule);
  });

  router.put("/:id/cancel", async (req, res) => {
    const { id } = req.params;
    await service.cancelSchedule(id);
    return res.status(200).send();
  });
  return router;
}
