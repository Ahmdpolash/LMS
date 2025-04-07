export interface ICourse {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountPrice?: number;
  students: number;
  lectures: number;
  category: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
}

type Avatar = {
  public_id: string;
  url: string;
};

export type TUser = {
  userId: string;
  avatar: Avatar;
  courses: string[];
  createdAt: string;
  email: string;
  isDeleted: boolean;
  isVerified: boolean;
  number: string;
  name: string;
  password: string;
  role: "admin" | "user" | "instructor"; // You can adjust roles as necessary
  status: "active" | "blocked"; // Adjust statuses based on your application
};
