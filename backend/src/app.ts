import express, { Application, urlencoded } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/check", (req, res) => {
  res.send("LMS IS RUNNING..");
});

export default app;
