import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.services";

// CREATE ORDER

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req.user, req.body);
 
  res.status(200).json({
    success: true,
    message: "Successfully Order Created",
    data: result,
  });
});

export const OrderController = { createOrder };
