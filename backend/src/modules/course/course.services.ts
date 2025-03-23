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
      url: myCloud.secure_url,
    };
  }

  // Save course to database
  const course = await Course.create(payload);

  return course;
};

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
