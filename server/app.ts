require('dotenv').config();
import express, { Application, json, Request, Response } from "express";
import "colors";
import cors from "cors";
import { config } from "dotenv";

const appRouter = require('./router');

const app: Application = express();

config();

app.use(cors());
app.use(json());

app.get("/", (_req: Request, res: Response) => {
  return res.send("App is Running...");
});

// app.use('/',  appRouter);

export default app;