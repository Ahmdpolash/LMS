import { Router } from "express";
import { UserAnalyticsControllers } from "./analytics.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.admin),
  UserAnalyticsControllers.getUserAnalytics
);

export const AnalyticsRoutes = router;
