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

// EDIT COURSE

const editCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.editCourse(id, req.body);

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

// GET SINGLE COURSE

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourse(id);

  res.status(200).json({
    success: true,
    message: "Signle course retrieved successfully",
    data: result,
  });
});

export const CourseControllers = {
  uploadCourse,
  editCourse,
  getSingleCourse,
};
