import catchAsync from "../../utils/catchAsync";
import { User } from "../user/user.models";
import { generateOneYearData } from "./analytics.utils";

const getUserAnalytics = catchAsync(async (req, res) => {
  const result = await generateOneYearData(User);

  res.status(200).json({
    success: true,
    message: "User analytics fetched successfully",
    data: result,
  });
});

export const UserAnalyticsControllers = { getUserAnalytics };
