import AppError from "../../errors/AppError";
import Course from "../course/course.model";
import { User } from "../user/user.models";
import { TOrder } from "./order.interface";

import httpStatus from "http-status";
import { Order } from "./order.model";
import { sendEmail } from "../../utils/sendMail";

// CREATE ORDER

const createOrder = async (userInfo: any, payload: TOrder) => {
  //find the user

  const user = await User.findById(userInfo._id);
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // check if the user is already purchased this course

  const isCourseExists = user?.courses.some(
    (course: any) => course._id.toString() === payload.courseId
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

  const orderData = {
    courseId: course._id,
    userId: user._id,
    payment_info: payload.payment_info,
  };

  const result = await Order.create(orderData);

  // sent mail to confiramtion order
  await sendEmail({
    to: user.email,
    subject: "Order Confirmation",
    templateName: "order",
    replacements: {
      courseId: course._id.toString().slice(0, 6),
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

  user?.courses.push(course?._id);

  user?.save();

  return result;
};

export const OrderServices = { createOrder };
