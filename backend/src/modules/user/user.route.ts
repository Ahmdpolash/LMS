import { Router } from "express";
import { UserControllers } from "./user.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

// SIGNUP ROUTES
router.post("/signup", UserControllers.CreateUser);

// SIGNIN ROUTES
router.post("/signin", UserControllers.CreateUser);

// ACTIVATE USER ROUTES
router.post("/activate-user", UserControllers.ActivateUser);

//GET ALL USER ROUTES
router.get("/", auth(USER_ROLE.admin), UserControllers.GetAllUSers);

// GET ME ROUTE
router.get("/me", auth(), UserControllers.GetMe);

// SOCIAL AUTHENTICATION ROUTE
router.post("/social-auth", UserControllers.SocialAuth);

// UPDATE USER ROUTE
router.patch("/update", auth(), UserControllers.UpdateUser);

// UPDATE USER ROLE ROUTE
router.patch(
  "/update-role",
  auth(USER_ROLE.admin),
  UserControllers.updateUserRole
);

// DELETE USER ROUTE

router.delete("/:id", auth(USER_ROLE.admin), UserControllers.deleteUser);

export const UserRoutes = router;
