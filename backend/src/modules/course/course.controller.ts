//need to watch more lms project tutorials

import catchAsync from "../../utils/catchAsync";

import { CourseServices } from "./course.services";

// create a new Course
const uploadCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.uploadCourse(req.body);

  res.status(200).json({
    success: true,
    message: "Course uploaded successfully",
    data: result,
  });
});

export const CourseControllers = {
  uploadCourse,
};
