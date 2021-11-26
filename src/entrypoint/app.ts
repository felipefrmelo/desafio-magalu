import "express-async-errors";
import express from "express";
import cors from "cors";
import { NotFoundError } from "./errors";
import { routers } from "./routers";
import { errorHandler } from "./middlewares";
import { makeService } from "./helper";

const app = express();
app.use(express.json());
app.use(cors());

async function init() {
  const service = await makeService();
  app.use("/schedule", routers(service));

  app.all("*", async (req, res) => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
}

export default { init };
