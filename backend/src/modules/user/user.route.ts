import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/signup", UserControllers.CreateStudent);
router.get("/", UserControllers.GetAllStudentFromDb);

export const userRoutes = router;
