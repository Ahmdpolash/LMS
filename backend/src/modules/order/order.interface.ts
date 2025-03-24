import { Types } from "mongoose";

export type TOrder = {
  courseId: string;
  userId: string;
  payment_info: object;
};
