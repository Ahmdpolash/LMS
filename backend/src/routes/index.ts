import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { OrderRoutes } from "../modules/order/order.route";
import { NotificationRoutes } from "../modules/notification/notification.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
