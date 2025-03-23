import { Router } from "express";
import { CourseControllers } from "./course.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin),
  CourseControllers.uploadCourse
);

router.patch("/:id", auth(USER_ROLE.admin), CourseControllers.editCourse);

export const CourseRoutes = router;
