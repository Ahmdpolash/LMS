import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post("/signin", AuthControllers.LoginUser);

router.post("/logout", auth(), AuthControllers.LogOut);

router.post("/refresh-token", AuthControllers.UpdateAccessToken);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.instructor, USER_ROLE.user),
  AuthControllers.ChangePassword
);

router.patch("/change-avatar", auth(), AuthControllers.updatedProfilePhoto);

// need to add forgot password system 

export const AuthRoutes = router;
