import catchAsync from "../../utils/catchAsync";
import { NotificationServices } from "./notification.services";

// GET ALL NOTIFICATIONS

const getAllNotification = catchAsync(async (req, res) => {
  const result = await NotificationServices.getAllNotification();

  res.status(200).json({
    success: true,
    message: "all notifications retrieved successfully",
    data: result,
  });
});



// UPDATE NOTIFICATION STATUS

const updateNotificationStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await NotificationServices.updateNotificationStatus(id, status);

  res.status(200).json({
    success: true,
    message: "notification status updated successfully",
    data: result,
  });
});


export const NotificationController = { getAllNotification,updateNotificationStatus };
