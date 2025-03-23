// course.interface.ts

// Define interfaces for each sub-schema used in the Course schema
export interface ILink {
  title: string;
  url: string;
}

export interface IComment {
  user: object;
  comment: string;
  commentReplies?: IComment[];
}

export interface IReview {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

export interface ICourseData {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

// Main Course interface
export interface ICourse {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: { public_id: string; url: string };
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
