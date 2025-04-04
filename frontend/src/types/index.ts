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
