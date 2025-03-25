import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.services";
import httpStatus from "http-status";
// CREATE ORDER

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req.user, req.body);

  res.status(200).json({
    success: true,
    message: "Successfully Order Created",
    data: result,
  });
});

// GET ALL Orders

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrders();

  res.status(httpStatus.OK).json({
    success: true,
    message: "All orders retrived successfully",
    data: result,
  });
});

export const OrderController = { createOrder, getAllOrders };
