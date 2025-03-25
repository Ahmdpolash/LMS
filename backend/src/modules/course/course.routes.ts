import { Router } from "express";
import { CourseControllers } from "./course.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// CREATE COURSE ROUTE
router.post(
  "/create-course",
  auth(USER_ROLE.admin),
  CourseControllers.uploadCourse
);

// GET ALL COURSE ROUTE
router.get("/", CourseControllers.getAllCourse);

// GET SINGLE COURSE ROUTE
router.get("/:id", CourseControllers.getSingleCourse);

// GET COURSE CONTENT BY USER
router.get(
  "/course-content/:id",
  auth(),
  CourseControllers.getCourseContentByUser
);

// EDIT COURSE ROUTE
router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.instructor),
  CourseControllers.editCourse
);

// ADD COMMENTS ROUTE

router.put("/add-question", auth(), CourseControllers.addQuestion);

// REPLY COMMENTS ROUTE
router.put("/reply-question", auth(), CourseControllers.replieQuestionAnswer);

// ADD REVIEWS ROUTE
router.put("/add-review/:id", auth(), CourseControllers.addReviews);

// REPLY REVIEWS ROUTE
router.put(
  "/reply-review",
  auth(USER_ROLE.admin, USER_ROLE.instructor),
  CourseControllers.replyReview
);

// DELETE COURSE 

router.delete("/:id", auth(USER_ROLE.admin, USER_ROLE.instructor), CourseControllers.deleteCourse);

export const CourseRoutes = router;
