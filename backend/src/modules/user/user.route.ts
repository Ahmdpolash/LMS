import { Router } from "express";
import { UserControllers } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/signup", UserControllers.CreateUser);

router.post("/signin", UserControllers.CreateUser);

router.post("/activate-user", UserControllers.ActivateUser);

router.get("/", UserControllers.GetAllStudentFromDb);

router.get("/me", auth(), UserControllers.GetMe);

router.post("/social-auth", UserControllers.SocialAuth);

router.patch("/update", auth(), UserControllers.UpdateUser);

export const UserRoutes = router;
