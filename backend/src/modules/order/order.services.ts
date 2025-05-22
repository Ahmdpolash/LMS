import AppError from "../../errors/AppError";
import Course from "../course/course.model";
import { User } from "../user/user.models";
import { TOrder } from "./order.interface";

import mongoose from "mongoose";
import httpStatus from "http-status";
import { Order } from "./order.model";
import { sendEmail } from "../../utils/sendMail";
import { Notification } from "../notification/notification.model";
import { ICourse } from "../course/course.interface";
import { IUser } from "../user/user.interface";
import config from "../../config";
import redis from "../../redis";
const stripe = require("stripe")(config.stripe.secretKey);

// CREATE ORDER

// const createOrder = async (userInfo: any, payload: TOrder) => {
//   if (payload.payment_info) {
//     if ("id" in payload.payment_info) {
//       const paymentIntentId = payload.payment_info.id;
//       const paymentIntent = await stripe.paymentIntents.retrieve(
//         paymentIntentId
//       );

//       if (paymentIntent.status !== "succeeded") {
//         throw new AppError("Payment failed", httpStatus.BAD_REQUEST);
//       }
//     }
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // Find user within transaction
//     const user = await User.findById(userInfo._id).session(session);
//     if (!user) {
//       throw new AppError("User not found", httpStatus.NOT_FOUND);
//     }

//     const isCourseExists = user?.courses.some(
//       (course: any) => course._id.toString() === payload.courseId
//     );

//     if (isCourseExists) {
//       throw new AppError(
//         "You have already purchased this course",
//         httpStatus.CONFLICT
//       );
//     }

//     // Find course within transaction
//     const course = await Course.findById(payload.courseId);

//     if (!course) {
//       throw new AppError("Course not found", httpStatus.NOT_FOUND);
//     }

//     // ✅ Send confirmation email (outside the transaction for safety)
//     await sendEmail({
//       to: user.email,
//       subject: "Order Confirmation",
//       templateName: "order",
//       replacements: {
//         courseId: (course?._id as mongoose.Types.ObjectId)
//           .toString()
//           .slice(0, 6),
//         name: course?.name,
//         username: user.name,
//         price: course.price.toString(),
//         date: new Date().toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         }),
//       },
//     });

//     // ✅ Add course to user purchased list
//     user.courses.push({
//       courseId: (course._id as mongoose.Types.ObjectId).toString(),
//     });
//     await user.save({ session });

//     // ✅ Update course purchase count
//     course.purchased = (course.purchased || 0) + 1;
//     await course.save({ session });

//     // ✅ Create order record
//     payload.userId = user._id;
//     const result = await Order.create([payload], { session });

//     // update on redis
//     await redis.set(user._id.toString(), JSON.stringify(user));
//     // await redis.del(`course:${payload.courseId}`);
//     await redis.del(payload.courseId);

//     // ✅ Create notification
//     await Notification.create(
//       [
//         {
//           userId: user._id,
//           title: "New Order",
//           message: `You have a new order for ${course?.name}`,
//         },
//       ],
//       { session }
//     );

//     // ✅ Commit transaction
//     await session.commitTransaction();
//     session.endSession();

//     return result[0]; // because create returns an array
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error; // forward error
//   }
// };

const createOrder = async (userInfo: any, payload: TOrder) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findById(userInfo._id).session(session);
    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    const isCourseExists = user?.courses.some(
      (course: any) => course?.courseId.toString() === payload.courseId
    );
    if (isCourseExists) {
      throw new AppError(
        "You have already purchased this course",
        httpStatus.CONFLICT
      );
    }

    const course = await Course.findById(payload.courseId);
    if (!course) {
      throw new AppError("Course not found", httpStatus.NOT_FOUND);
    }

    // Send email (handle failure gracefully)
    try {
      await sendEmail({
        to: user.email,
        subject: "Order Confirmation",
        templateName: "order",
        replacements: {
          courseId: (course?._id as mongoose.Types.ObjectId)
            .toString()
            .slice(0, 6),
          name: course?.name,
          username: user.name,
          price: course.price.toString(),
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue execution; don't throw
    }

    user.courses.push({
      courseId: (course._id as mongoose.Types.ObjectId).toString(),
      purchasedDate: new Date(),
    });
    await user.save({ session });

    course.purchased = (course.purchased || 0) + 1;

    await course.save({ session });

    payload.userId = user._id;
    const result = await Order.create([payload], { session });

    await Notification.create(
      [
        {
          userId: user._id,
          title: "New Order",
          message: `You have a new order for ${course?.name}`,
        },
      ],
      { session }
    );

    // Update Redis (handle failure gracefully)
    try {
      await redis.set(user._id.toString(), JSON.stringify(user));
      // await redis.set(
      //   `course:${payload.courseId}`,
      //   JSON.stringify(course),
      //   "EX",
      //   3600
      // );
      await redis.del(payload.courseId);
      await redis.del("allCourses");
    } catch (redisError) {
      console.error("Failed to update Redis:", redisError);
      // Continue execution; don't throw
    }

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// GET ALL ORDER
const getAllOrders = async () => {
  const result = await Order.find().sort({ createdAt: -1 }).lean();

  return result;
};

export const OrderServices = { createOrder, getAllOrders };

// transaction and remove
