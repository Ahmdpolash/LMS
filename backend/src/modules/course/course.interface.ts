import { IUser } from "../user/user.interface";

export interface ILink {
  title: string;
  url: string;
}

export interface IComment {
  user: object;
  question: string;
  questionReplies?: [];
}

export interface IReview {
  user: object;
  rating: number;
  comment: string;
  commentReplies?: IComment[]; // Add this only if your schema has it!
}

export interface ICourseData {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

export interface ICourse {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail?: { public_id: string; url: string };
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

export interface IQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export interface IAddQuestionReplies {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export interface INewQuestionReplies {
  user: IUser;
  answer: string;
}
