import { model, Schema } from "mongoose";
import { TNotification } from "./notification.interface";

const NotificationSchema = new Schema<TNotification>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
    status: {
      type: String,
      // enum: ["unread", "read"],
      // default: "unread",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<TNotification>(
  "Notification",
  NotificationSchema
);
