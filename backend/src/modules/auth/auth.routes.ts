import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/signin", AuthControllers.LoginUser);

router.post("/logout", auth, AuthControllers.LogOut);

export const AuthRoutes = router;
