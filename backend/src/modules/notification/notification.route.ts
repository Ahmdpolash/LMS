import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// GET NOTIFICATION ROUTE
router.get(
  "/",
  auth(USER_ROLE.admin),
  NotificationController.getAllNotification
);

// UPDATE STATUS
router.patch(
  "/update-notification-status/:id",
  auth(USER_ROLE.admin),
  NotificationController.updateNotificationStatus
);

export const NotificationRoutes = router;
