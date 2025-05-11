import { Request } from "express";
import cloudinary from "cloudinary";
import { Layout } from "./layout.model";
import AppError from "../../errors/AppError";

// create layout
// export const CreateLayout = async (type: string, req: Request) => {
//   const isTypeExists = await Layout.findOne({ type });

//   if (isTypeExists) {
//     throw new AppError(${type} is already exists, 404);
//   }

//   // if type is banner then create banner model data
//   if (type === "Banner") {
//     const { image, title, subTitle } = req.body.banner;

//     const banner = {
//       type: "Banner",
//       banner: {
//         image: {
//           public_id: image.public_id,
//           url: image.url,
//         },
//         title,
//         subTitle,
//       },
//     };

//     await Layout.create(banner);
//   }

//   //if type is faq then create faq model data

//   if (type === "Faq") {
//     const { faq } = req.body;

//     const faqItems = await Promise.all(
//       faq.map(async (item: any) => ({
//         question: item.question,
//         answer: item.answer,
//         badge: item.badge,
//         icon: item.icon,
//       }))
//     );
//     await Layout.create({ type: "Faq", faq: faqItems });
//   }

//   // if type is category then create category model data

//   if (type === "Category") {
//     const { categories } = req.body;
//     const categoriesItem = await Promise.all(
//       categories.map(async (item: any) => ({
//         title: item.title,
//       }))
//     );
//     await Layout.create({ type: "Category", categories: categoriesItem });
//   }

//   return { message: "Layout created successfully" };
// };

export const CreateLayout = async (type: string, req: Request) => {
  // Handle Banner (only one allowed)
  if (type === "Banner") {
    const isTypeExists = await Layout.findOne({ type });
    if (isTypeExists) {
      throw new AppError(`${type} is already exists`, 404);
    }

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

  // Handle Faq (only one allowed)
  // else if (type === "Faq") {
  //   const isTypeExists = await Layout.findOne({ type });
  //   if (isTypeExists) {
  //     throw new AppError(`${type} is already exists`, 404);
  //   }

  //   const { faq } = req.body;

  //   const faqItems = faq.map((item: any) => ({
  //     question: item.question,
  //     answer: item.answer,
  //     badge: item.badge,
  //     icon: item.icon,
  //   }));

  //   await Layout.create({ type: "Faq", faq: faqItems });
  // }

  // Handle Category (can append multiple times)
  else if (type === "Category") {
    const { title, image } = req.body;

    const existing = await Layout.findOne({ type: "Category" });

    const newCategory = { title, image };

    if (existing) {
      const duplicate = existing.categories.find(
        (c) => c.title?.toLowerCase() === title?.toLowerCase()
      );

      if (duplicate) {
        throw new AppError("This Category already Exists", 400);
      }

      existing.categories.push(newCategory);
      await existing.save();
    } else {
      await Layout.create({ type: "Category", categories: [newCategory] });
    }
  }

  return { message: "Layout created successfully" };
};

// get layout
export const GetLayout = async (type: string) => {
  const result = await Layout.findOne({ type });

  return result;
};

//single layout
export const GetSingleLayout = async (id: string) => {
  const result = await Layout.findById(id);
  return result;
};

// update layout

export const EditLayout = async (type: string, req: Request) => {
  // if type is banner then create banner model data
  if (type === "Banner") {
    // find banner data
    const bannerData: any = await Layout.findOne({ type: "Banner" });

    const { image, title, subTitle } = req.body.banner;

    const res = await Layout.findByIdAndUpdate(
      bannerData._id,
      {
        banner: {
          image: {
            public_id: image.public_id,
            url: image.url,
          },
          title,
          subTitle,
        },
      },
      { new: true }
    );
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
