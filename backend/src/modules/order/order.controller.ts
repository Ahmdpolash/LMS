import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.services";
import httpStatus from "http-status";
const stripe = require("stripe")(config.stripe.secretKey);

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

// sent stripe published key
const sendStripePublishableKey = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Stripe publishable key sent successfully",
    data: config.stripe.publishableKey,
  });
});

// new payment

const newPayment = catchAsync(async (req, res) => {
 
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Elearning",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: "Payment intent created successfully",
      // data: myPayment,
      client_secret: myPayment.client_secret,
    });
  } catch (error: any) {
    throw new AppError(error.message, httpStatus.BAD_REQUEST);
  }
});

export const OrderController = {
  createOrder,
  getAllOrders,
  sendStripePublishableKey,
  newPayment,
};
