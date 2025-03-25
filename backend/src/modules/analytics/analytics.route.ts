import { Router } from "express";
import { UserAnalyticsControllers } from "./analytics.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// GET USER ANALYTICS ROUTE
router.get(
  "/user-analytics",
  auth(USER_ROLE.admin),
  UserAnalyticsControllers.getUserAnalytics
);

// GET COURSES ANALYTICS ROUTES

router.get(
  "/course-analytics",
  auth(USER_ROLE.admin),
  UserAnalyticsControllers.getCoursesAnalytics
);

// GET ORDER ANALYTICS ROUTES

router.get(
  "/order-analytics",
  auth(USER_ROLE.admin),
  UserAnalyticsControllers.getOrderAnalytics
);

export const AnalyticsRoutes = router;
