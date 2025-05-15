type thubnamil = {
  public_id: string;
  url: string;
};

export type CourseInfo = {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  tags: string[];
  level: string;
  demoUrl: string;
  thumbnail: thubnamil | null;
  category: string;
};
export type CourseContent = {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  links: { title: string; url: string }[];
  suggestion: string;
};
