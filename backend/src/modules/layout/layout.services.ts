import { Request } from "express";
import cloudinary from "cloudinary";
import { Layout } from "./layout.model";
import AppError from "../../errors/AppError";

// create layout
export const CreateLayout = async (type: string, req: Request) => {
  const isTypeExists = await Layout.findOne({ type });

  if (isTypeExists) {
    throw new AppError(`${type} is already exists`, 404);
  }

  // if type is banner then create banner model data
  if (type === "Banner") {
    const { image, title, subTitle } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout",
    });

    const banner = {
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      title,
      subTitle,
    };

    await Layout.create(banner);
  }

  //if type is faq then create faq model data

  if (type === "Faq") {
    const { faq } = req.body;

    const faqItems = await Promise.all(
      faq.map(async (item: any) => ({
        question: item.question,
        answer: item.answer,
      }))
    );
    await Layout.create({ type: "Faq", faq: faqItems });
  }

  // if type is category then create category model data

  if (type === "Category") {
    const { categories } = req.body;
    const categoriesItem = await Promise.all(
      categories.map(async (item: any) => ({
        title: item.title,
      }))
    );
    await Layout.create({ type: "Category", categories: categoriesItem });
  }

  return { message: "Layout created successfully" };
};

export const GetLayout = async () => {
  const result = await Layout.find();

  return result;
};
