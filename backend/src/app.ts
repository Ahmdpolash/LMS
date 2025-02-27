import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import config from "./config";

const app: Application = express();

app.use(
  cors({
    origin: config.origin,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/check", (req: Request, res: Response) => {
  res.send("LMS IS RUNNING..");
});

export default app;
