import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { ScheduleService } from "../service_layer/scheduleService";
import { makeService } from "./helper";
import { CustomError, NotFoundError } from "./errors";

const app = express();
app.use(express.json());
app.use(cors());

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};

function init(service: ScheduleService) {
  app.post("/schedule", async (req, res) => {
    const { body } = req;
    await service.createSchedule(body);
    return res.status(201).send();
  });

  app.get("/schedule/:id", async (req, res) => {
    const { id } = req.params;
    const schedule = await service.getSchedule(id);
    if (!schedule) {
      throw new NotFoundError();
    }
    return res.status(200).json(schedule);
  });

  app.put("/schedule/:id/cancel", async (req, res) => {
    const { id } = req.params;
    await service.cancelSchedule(id);
    return res.status(200).send();
  });

  app.all("*", async (req, res) => {
    throw new Error("Not found");
  });

  app.use(errorHandler);

  return app;
}

async function start(port: number = 8080) {
  const service = await makeService();
  init(service);
  app.listen(port, () => {
    console.log("Server started on port ", port);
  });
}

export default { init, start };
