import { Types } from "mongoose";

export type TNotification = {
  title: string;
  message: string;
  status: string;
  userId: Types.ObjectId;
};
