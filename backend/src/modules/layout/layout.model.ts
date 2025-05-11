import { model, Schema } from "mongoose";
import {
  IBannerImage,
  ICourseCategory,
  IFaq,
  ILayout,
} from "./layout.interface";

const FaqSchema = new Schema<IFaq>(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CategorySchema = new Schema<ICourseCategory>(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const BannerSchema = new Schema<IBannerImage>({
  public_id: {
    type: String,
  },
  url: { type: String },
});

const LayoutSchema = new Schema<ILayout>(
  {
    type: { type: String },
    faq: [FaqSchema],
    categories: [CategorySchema],
    banner: {
      image: BannerSchema,
      title: { type: String },
      subTitle: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Layout = model<ILayout>("Layout", LayoutSchema);
