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

// CREATE ORDER

// const createOrder = async (userInfo: any, payload: TOrder) => {
//   //find the user

//   const user = await User.findById(userInfo._id);
//   if (!user) {
//     throw new AppError("User not found", httpStatus.NOT_FOUND);
//   }

//   // check if the user is already purchased this course

//   const isCourseExists = user?.courses.some(
//     (course: any) => course._id.toString() === payload.courseId
//   );

//   if (isCourseExists) {
//     throw new AppError(
//       "You have already purchased this course",
//       httpStatus.CONFLICT
//     );
//   }

//   // find the course by courseId
//   const course = await Course.findById(payload.courseId);

//   if (!course) {
//     throw new AppError("Course not found", httpStatus.NOT_FOUND);
//   }

//   // sent mail to confiramtion order
//   await sendEmail({
//     to: user.email,
//     subject: "Order Confirmation",
//     templateName: "order",
//     replacements: {
//       courseId: course._id as string,
//       name: course?.name,
//       username: user.name,
//       price: course.price.toString(),
//       date: new Date().toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//     },
//   });

//   // push the course id in user.courses
//   user?.courses.push(course?._id);
//   await user?.save();

//   await Notification.create({
//     userId: user?._id,
//     title: "New Order",
//     message: `You have a new order from ${course?.name}`,
//   });

//   // update course purchased count
//   course?.purchased ? (course.purchased += 1) : course?.purchased;
//   await course.save();

//   // create order to order model
//   payload.userId = user._id;
//   const result = await Order.create(payload);
//   return result;
// };

const createOrder = async (userInfo: any, payload: TOrder) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find user within transaction
    const user = await User.findById(userInfo._id).session(session);
    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    const isCourseExists = user?.courses.some(
      (course: any) => course._id.toString() === payload.courseId
    );

    if (isCourseExists) {
      throw new AppError(
        "You have already purchased this course",
        httpStatus.CONFLICT
      );
    }

    // Find course within transaction
    const course = await Course.findById(payload.courseId);

    if (!course) {
      throw new AppError("Course not found", httpStatus.NOT_FOUND);
    }

    // ✅ Send confirmation email (outside the transaction for safety)
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

    // ✅ Add course to user purchased list
    user.courses.push({
      courseId: (course._id as mongoose.Types.ObjectId).toString(),
    });
    await user.save({ session });

    // ✅ Update course purchase count
    course.purchased = (course.purchased || 0) + 1;
    await course.save({ session });

    // ✅ Create order record
    payload.userId = user._id;
    const result = await Order.create([payload], { session });

    // ✅ Create notification
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

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return result[0]; // because create returns an array
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // forward error
  }
};

export const OrderServices = { createOrder };

// transaction and remove
