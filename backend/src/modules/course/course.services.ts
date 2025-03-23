import { ICourse } from "./course.interface";
import cloudinary from "cloudinary";
import Course from "./course.model";
import { redis } from "../../redis";
import AppError from "../../errors/AppError";

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

export const CourseServices = {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourse,
  getCourseContentByUser,
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
