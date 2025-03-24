import { Types } from "mongoose";

export type TOrder = {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  payment_info: object;
};
