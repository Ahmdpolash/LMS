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
    const { image, title, subTitle } = req.body.banner;

    const banner = {
      type: "Banner",
      banner: {
        image: {
          public_id: image.public_id,
          url: image.url,
        },
        title,
        subTitle,
      },
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
        badge: item.badge,
        icon: item.icon,
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

// get layout
export const GetLayout = async (type: string) => {
  const result = await Layout.findOne({ type });

  return result;
};

// update layout

export const EditLayout = async (type: string, req: Request) => {
  // if type is banner then create banner model data
  if (type === "Banner") {
    // find banner data
    const bannerData: any = await Layout.findOne({ type: "Banner" });

    const { image, title, subTitle } = req.body;

    // // if already have then destroy the banner image
    // if (bannerData) {
    //   await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
    // }

    // // upload banner
    // const myCloud = await cloudinary.v2.uploader.upload(image, {
    //   folder: "layout",
    // });

    const banner = {
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      title,
      subTitle,
    };

    await Layout.findByIdAndUpdate(bannerData._id, banner, { new: true });
  }

  //if type is faq then create faq model data

  if (type === "Faq") {
    const faqData = await Layout.findOne({ type: "Faq" });

    const { faq } = req.body;

    const faqItems = await Promise.all(
      faq.map(async (item: any) => ({
        question: item.question,
        answer: item.answer,
      }))
    );
    await Layout.findByIdAndUpdate(
      faqData?._id,
      {
        type: "Faq",
        faq: faqItems,
      },
      { new: true }
    );
  }

  // if type is category then create category model data

  if (type === "Category") {
    const categoryItem = await Layout.findOne({ type: "Category" });

    const { categories } = req.body;
    const categoriesItem = await Promise.all(
      categories.map(async (item: any) => ({
        title: item.title,
      }))
    );
    await Layout.findByIdAndUpdate(
      categoryItem?._id,
      {
        type: "Category",
        categories: categoriesItem,
      },
      { new: true }
    );
  }

  return { message: "Layout updated successfully" };
};
