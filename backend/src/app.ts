import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import router from "./routes";

const app: Application = express();

// app.use(
//   cors({
//     origin: process.env.ORIGIN?.split(","),
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://elearning-seven-kappa.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("LMS IS RUNNING..");
});

//middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;

/*
https://lms-backend-seven-ruddy.vercel.app/
*/
