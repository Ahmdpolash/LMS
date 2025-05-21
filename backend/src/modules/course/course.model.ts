import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../user/user.interface";
import { IQuestionData } from "./course.interface";

interface IComment extends Document {
  user: IUser;
  // user: object;
  question: string;
  questionReplies: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
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

interface ICourse extends Document {
  name: string;
  description: string;
  category?: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string[];
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
  isDeleted?: boolean;
}

// Update your IComment interface to reflect this
interface IQuestionReply extends Document {
  userId: IUser; 
  answer: string;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  {
    timestamps: true,
  }
);

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const questionReplySchema = new Schema<IQuestionReply>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
); 

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    question: String,
    questionReplies: [questionReplySchema],
  },
  {
    timestamps: true,
  }
);

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    category: {
      type: String,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    tags: {
      type: [String],
      required: true, // Fix typo
    },
    level: {
      type: String,
      required: true, // Fix typo
    },
    demoUrl: {
      type: String,
      required: true, // Fix typo
    },

    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],

    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

//TODO: NEED TO CUSTOMIZE IT LATER ..
