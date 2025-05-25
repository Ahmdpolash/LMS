import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import router from "./routes";

const app: Application = express();

// cors origin
app.use(
  cors({
    origin: ["http://localhost:3000", "https://elearning-two-black.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// api limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   limit: 100,
//   standardHeaders: "draft-8",
//   legacyHeaders: false,
// });

//routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("LMS IS RUNNING..");
});

//middleware

app.use(globalErrorHandler);
app.use(notFound);
// Apply the rate limiting middleware to all requests.
// app.use(limiter);

export default app;

