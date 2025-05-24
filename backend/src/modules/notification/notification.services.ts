import AppError from "../../errors/AppError";
import { Notification } from "./notification.model";
import cron from "node-cron";
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

// DELETE NOTIFICATION AFTER 30 DAYS : those who's status is read

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });

  console.log("deleted notification");
});

export const NotificationServices = {
  getAllNotification,
  updateNotificationStatus,
};
