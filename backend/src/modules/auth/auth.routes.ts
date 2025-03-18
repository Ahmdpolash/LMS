import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post("/signin", AuthControllers.LoginUser);

router.post("/logout", auth(), AuthControllers.LogOut);

router.post("/refresh-token", AuthControllers.RefreshToken);

export const AuthRoutes = router;
