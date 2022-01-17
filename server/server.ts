require('dotenv').config();
import express, { Application, json, Request, Response } from "express";
import "colors";
import cors from "cors";
import { config } from "dotenv";
import app from './app';

// const appRouter = require('./router');

// const app: Application = express();

// config();

// app.use(cors());
// app.use(json());

const PORT: string | number = process.env.PORT || 5000;
const ENV: string = process.env.NODE_ENV || "development";

// app.get("/", (_req: Request, res: Response) => {
//   return res.send("App is Running...");
// });

// app.use('/',  appRouter);

const server = app.listen(PORT, () =>
  console.log(
    ` 📡 Backend server: ` +
      ` Running in ${ENV} mode on port ${PORT}`
  )
);

export default server;