import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

// need to add trxId field on this model

export const Order = model<TOrder>("Order", OrderSchema);
