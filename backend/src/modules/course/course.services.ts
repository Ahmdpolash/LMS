import {
  IAddQuestionReplies,
  ICourse,
  IQuestionData,
  IReview,
  IReviewReplies,
} from "./course.interface";
import cloudinary from "cloudinary";
import Course from "./course.model";
import { redis } from "../../redis";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import { sendEmail } from "../../utils/sendMail";
import { User } from "../user/user.models";
import { Request } from "express";
import { IUser } from "../user/user.interface";
import { Notification } from "../notification/notification.model";

// create a new Course

const uploadCourse = async (payload: ICourse) => {
  const thumbnail = payload.thumbnail;

  if (thumbnail) {
    // Upload thumbnail to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(thumbnail as any, {
      folder: "courses",
    });

    payload.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  // Save course to database
  const course = await Course.create(payload);

  // Clear the cached courses
  await redis.del("allCourses");

  return course;
};

// GET ALL COURSE
const getAllCourse = async () => {
  // check first in redis if course is already available
  const isCourseExists = await redis.get("allCourses");

  if (isCourseExists) {
    const result = JSON.parse(isCourseExists);
    return result;
  }

  const result = await Course.find()
    .select(
      "-courseData.videoUrl -courseData.suggestion  -courseData.questions -courseData.links "
    )
    .sort({ createdAt: -1 })
    .lean();

  // set the data on redis now
  await redis.set("allCourses", JSON.stringify(result));

  return result;
};

// GET SINGLE COURSE
const getSingleCourse = async (id: string) => {
  // check first in redis if course is already available
  const isCourseExists = await redis.get(id);

  if (isCourseExists) {
    const result = JSON.parse(isCourseExists);
    return result;
  }

  // find from mongodb
  const result = await Course.findById(id)
    .select(
      "-courseData.videoUrl -courseData.suggestion  -courseData.questions -courseData.links "
    )
    .lean();

  // set the data on redis now
  await redis.set(id, JSON.stringify(result));

  return result;
};

// GET COURSE CONTENT-- 0NLY FOR VALID USER
const getCourseContentByUser = async (courseId: string, courseList: any) => {
  // find the course is available or not
  const courseExists = courseList.find(
    (c: any) => c._id.toString() === courseId
  );

  if (!courseExists) {
    throw new AppError("you are not aligable to access this course", 404);
  }

  // if exists then fetch from Course
  const course = await Course.findById(courseId);
  const content = course?.courseData;

  return content;
};

// EDIT COURSE
const editCourse = async (id: string, payload: Partial<ICourse>) => {
  const thumbnail = payload.thumbnail;

  if (thumbnail) {
    // delete this thumbnail if have

    await cloudinary.v2.uploader.destroy(thumbnail.public_id);
    // Upload thumbnail to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(thumbnail as any, {
      folder: "courses",
    });

    payload.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  // Save course to database
  const course = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return course;
};

// ADD QUESTION IN COURSE

const addQuestion = async (user: any, payload: IQuestionData) => {
  // Validate courseId
  if (!mongoose.Types.ObjectId.isValid(payload.courseId)) {
    throw new AppError(`Invalid Course Id: ${payload.courseId}`, 400);
  }

  const course = await Course.findById(payload.courseId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // Validate contentId
  if (!mongoose.Types.ObjectId.isValid(payload.contentId)) {
    throw new AppError(`Invalid Content Id: ${payload.contentId}`, 400);
  }

  const courseContent = course.courseData.find((item: any) =>
    item._id.equals(payload.contentId)
  );

  if (!courseContent) {
    throw new AppError("Course Content not found", 404);
  }

  const newQuestion: any = {
    userId: user?._id,
    question: payload.question,
    questionReplies: [],
  };

  courseContent.questions.push(newQuestion);
  // ✅ Create notification
  await Notification.create({
    userId: user._id,
    title: "Got a new comment",
    message: `You have a new comment in  ${courseContent?.title}`,
  });

  await course.save();

  return course;
};

// REPLIES QUESTION
const replieQuestionAnswer = async (
  user: any,
  payload: IAddQuestionReplies
) => {
  // finding course id courseId
  const course = await Course.findById(payload.courseId);
  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // find course content using id
  const courseContent = course.courseData.find((item: any) =>
    item._id.equals(payload.contentId)
  );

  if (!courseContent) {
    throw new AppError("Course Content not found", 404);
  }

  // question id matchig
  const question = courseContent.questions.find((item: any) =>
    item._id.equals(payload.questionId)
  );

  if (!question) {
    throw new AppError(" Invalid question Id", 404);
  }

  const RepliesComments: any = {
    userId: user._id,
    answer: payload.answer,
    createdAt: new Date(),
  };

  question.questionReplies?.push(RepliesComments);

  await course?.save();

  // find question owner by id from user
  const questionOwner = await User.findById(question.user);
  console.log("owner", questionOwner);

  // === Notification / Email Logic ===
  if (user?._id === question?.user?._id) {
    // notification sent

    // ✅ Create notification
    await Notification.create({
      userId: user._id,
      title: "New Comment Reply Received",
      message: `You have a new order for ${courseContent?.title}`,
    });
  } else {
    const data = {
      name: questionOwner?.name,
      title: courseContent.title,
      answer: payload.answer,
    };

    await sendEmail({
      to: questionOwner?.email as string,
      subject: "New Reply to Your Question",
      templateName: "notification",
      replacements: {
        name: data.name as string,
        courseTitle: data.title,
        answer: data.answer,
      },
    });
  }

  return course;
};

// ADD REVIEWS

const addReviews = async (req: Request, payload: IReview) => {
  const userCourseList = req.user?.courses;
  const courseId = req.params.id;

  // find the course of the user
  const isCourseExists = userCourseList?.some(
    (course: any) => course._id.toString() === courseId.toString()
  );

  if (!isCourseExists) {
    throw new AppError("You are not aligable to access this course", 404);
  }

  const course = await Course.findById(courseId);

  const review: any = {
    user: req.user._id,
    rating: payload.rating,
    comment: payload.comment,
    createdAt: new Date(),
  };

  course?.reviews.push(review);

  let avg = 0;
  course?.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  if (course) {
    course.ratings = avg / course.reviews.length;
  }

  await course?.save();

  const notification = {
    title: "New Review Received",
    message: `${req.user?.name} has given a review in ${course?.name}`,
  };

  //todo: create notification

  return course;
};

// REPLY REVIEWS

const addReviewReply = async (user: any, payload: IReviewReplies) => {
  // find cours by course id
  const course = await Course.findById(payload.courseId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // find review by id

  const review = course.reviews.find(
    (rev: any) => rev._id.toString() === payload.reviewId
  );

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  const replyReview: any = {
    userId: user?._id,
    comment: payload.comment,
  };

  // push it
  if (!review.commentReplies) {
    review.commentReplies = [];
  }
  review.commentReplies?.push(replyReview);

  await course?.save();

  return course;
};

// DELETE COURSE
const deleteCourse = async (id: string) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new AppError("course not found", 404);
  }

  await Course.findByIdAndDelete(id);

  // Get the cached course list from Redis
  const cachedCourses = await redis.get("allCourses");

  if (cachedCourses) {
    // Parse the cached data and remove the deleted course
    const updatedCourses = JSON.parse(cachedCourses).filter(
      (course: any) => course._id !== id
    );

    await redis.set("allCourses", JSON.stringify(updatedCourses));

  }

  return { message: "Course marked as deleted" };
};

export const CourseServices = {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourse,
  getCourseContentByUser,
  addQuestion,
  replieQuestionAnswer,
  addReviews,
  addReviewReply,
  deleteCourse,
};

/*


  -- update pseduo object inside an object 


  const { name, ...remainingAdminData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }


*/
