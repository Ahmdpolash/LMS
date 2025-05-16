import { Router } from "express";
import { OrderController } from "./order.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// CREATE ORDER ROUTE
router.post("/create-order", auth(), OrderController.createOrder);

// GET ORDER ROUTE
router.get("/", auth(USER_ROLE.admin), OrderController.getAllOrders);

// GET STRIPE KEY ROUTE
router.get("/stripe-key", auth(), OrderController.sendStripePublishableKey);

// create payment intent
router.post("/create-payment-intent", auth(), OrderController.newPayment);

export const OrderRoutes = router;
