import { Types } from "mongoose";

export type TOrder = {
  courseId: string;
  purchasedDate: Date;
  userId: string;
  payment_info: object;
};
