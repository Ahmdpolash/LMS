
import AppError from "../../errors/AppError";
import { Notification } from "./notification.model";

// GET ALL NOTIFICATIONS

const getAllNotification = async () => {
  const result = await Notification.find().sort({ createdAt: -1 }).lean();

  return result;
};


// UPDATE STATUS
const updateNotificationStatus = async (id: string, status: string) => {
  const notification = await Notification.findById(id);

  if (!notification) {
    throw new AppError("notification not found", 404);
  }

  //update the status
  notification.status ? (notification.status = "read") : notification.status;
  await notification.save();

  const result = await Notification.find().sort({ createdAt: -1 }).lean();

  return result;
};

export const NotificationServices = {
  getAllNotification,
  updateNotificationStatus,
};
