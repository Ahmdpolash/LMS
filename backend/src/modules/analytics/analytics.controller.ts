import catchAsync from "../../utils/catchAsync";
import Course from "../course/course.model";
import { Order } from "../order/order.model";
import { User } from "../user/user.models";
import { generateOneYearData } from "./analytics.utils";

// GET USER ANALYTICS

const getUserAnalytics = catchAsync(async (req, res) => {
  const result = await generateOneYearData(User);

  res.status(200).json({
    success: true,
    message: "User analytics fetched successfully",
    data: result,
  });
});

// GET COURSE ANALYTICS
const getCoursesAnalytics = catchAsync(async (req, res) => {
  const result = await generateOneYearData(Course);

  res.status(200).json({
    success: true,
    message: "Course analytics fetched successfully",
    data: result,
  });
});

// GET COURSE ANALYTICS
const getOrderAnalytics = catchAsync(async (req, res) => {
  const result = await generateOneYearData(Order);

  res.status(200).json({
    success: true,
    message: "Orders analytics fetched successfully",
    data: result,
  });
});

export const UserAnalyticsControllers = {
  getUserAnalytics,
  getCoursesAnalytics,
  getOrderAnalytics,
};
