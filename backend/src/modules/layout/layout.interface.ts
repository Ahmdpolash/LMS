export interface IFaq {
  question: string;
  answer: string;
  badge?: string;
  icon?: string;
}

export interface ICourseCategory {
  title: string;
}

export interface IBannerImage {
  public_id: string;
  url: string;
}

export interface ILayout {
  type: string;
  faq: IFaq[];
  categories: ICourseCategory[];
  banner: {
    image: IBannerImage;
    title: string;
    subTitle: string;
  };
}
