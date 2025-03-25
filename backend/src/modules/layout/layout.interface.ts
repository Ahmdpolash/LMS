export interface IFaq {
  question: string;
  answer: string;
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
  courseCategory: ICourseCategory[];
  banner: {
    image: IBannerImage;
    title: string;
    subTitle: string;
  };
}
