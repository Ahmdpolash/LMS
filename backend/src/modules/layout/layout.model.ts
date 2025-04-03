import { model, Schema } from "mongoose";
import {
  IBannerImage,
  ICourseCategory,
  IFaq,
  ILayout,
} from "./layout.interface";

const FaqSchema = new Schema<IFaq>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  badge: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const CategorySchema = new Schema<ICourseCategory>({
  title: {
    type: String,
  },
});

const BannerSchema = new Schema<IBannerImage>({
  public_id: {
    type: String,
  },
  url: { type: String },
});

const LayoutSchema = new Schema<ILayout>({
  type: { type: String },
  faq: [FaqSchema],
  categories: [CategorySchema],
  banner: {
    image: BannerSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

export const Layout = model<ILayout>("Layout", LayoutSchema);
