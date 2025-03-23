import { ICourse } from "./course.interface";
import cloudinary from "cloudinary";
import Course from "./course.model";

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
      url: myCloud.url,
    };
    payload.thumbnail = { public_id: thumbnail.public_id, url: thumbnail.url };
  }

  // Save course to database
  const course = await Course.create(payload);

  return course;
};

export const CourseServices = {
  uploadCourse,
};
