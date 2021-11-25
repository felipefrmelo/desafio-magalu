import express from "express";

const app = express();

app.use(express.json());

app.post("/schedule", (req, res) => {
  return res.status(201).send();
});

export default app;
