import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/signup", UserControllers.CreateUser);

router.post("/signin", UserControllers.CreateUser);

router.post("/activate-user", UserControllers.ActivateUser);

router.get("/", UserControllers.GetAllStudentFromDb);

export const UserRoutes = router;
