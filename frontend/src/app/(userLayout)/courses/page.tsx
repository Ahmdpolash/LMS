"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Star,
  Search,
  Filter,
  BookOpen,
  Users,
  ArrowRight,
  X,
  SlidersHorizontal,
} from "lucide-react";
import Container from "@/components/shared/Container";
import { courses } from "@/constant";
import { BlurFade } from "@/components/magicui/blur-fade";
import { motion } from "framer-motion";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import Link from "next/link";
import CardSkeleton from "@/components/shared/CardSkeleton";
interface Course {
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
  description: string;
  tags: string[];
}

export default function CoursesPage() {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const allCourses = data?.data;
  console.log(allCourses);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState<string>("popular");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // In a real app, this would be a fetch call to your API
  const coursesData: Course[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.8,
      reviewCount: 2547,
      originalPrice: 99.99,
      discountPrice: 84.99,
      students: 15420,
      lectures: 142,
      category: "Web Development",
      instructor: "Sarah Johnson",
      level: "All Levels",
      description:
        "Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more.",
      tags: ["html", "css", "javascript", "react", "node.js"],
    },
    {
      id: 2,
      title: "Data Science & Machine Learning Fundamentals",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 1832,
      originalPrice: 129.99,
      discountPrice: 89.99,
      students: 12350,
      lectures: 98,
      category: "Data Science",
      instructor: "Michael Chen",
      level: "Intermediate",
      description:
        "Master the fundamentals of data science and machine learning. Learn Python, pandas, NumPy, scikit-learn, and TensorFlow.",
      tags: ["python", "data science", "machine learning", "tensorflow"],
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.7,
      reviewCount: 1245,
      originalPrice: 89.99,
      discountPrice: 69.99,
      students: 8750,
      lectures: 86,
      category: "Design",
      instructor: "Emma Rodriguez",
      level: "Beginner",
      description:
        "Learn UI/UX design principles and create stunning user interfaces. Master Figma, Adobe XD, and design thinking.",
      tags: ["ui", "ux", "figma", "design"],
    },
    {
      id: 4,
      title: "Advanced JavaScript: From Fundamentals to Mastery",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 2103,
      originalPrice: 109.99,
      students: 10840,
      lectures: 124,
      category: "Programming",
      instructor: "David Wilson",
      level: "Advanced",
      description:
        "Take your JavaScript skills to the next level. Learn advanced concepts like closures, prototypes, async/await, and more.",
      tags: ["javascript", "es6", "node.js", "programming"],
    },
    {
      id: 5,
      title: "Digital Marketing Strategy & Social Media",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.6,
      reviewCount: 987,
      originalPrice: 79.99,
      discountPrice: 59.99,
      students: 7650,
      lectures: 78,
      category: "Marketing",
      instructor: "Sophia Martinez",
      level: "All Levels",
      description:
        "Master digital marketing strategies and social media campaigns. Learn SEO, content marketing, and analytics.",
      tags: ["marketing", "social media", "seo", "analytics"],
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.8,
      reviewCount: 1456,
      originalPrice: 119.99,
      discountPrice: 94.99,
      students: 9320,
      lectures: 112,
      category: "Mobile Development",
      instructor: "James Taylor",
      level: "Intermediate",
      description:
        "Build cross-platform mobile apps with React Native. Create iOS and Android apps with a single codebase.",
      tags: ["react native", "mobile", "javascript", "ios", "android"],
    },
    {
      id: 7,
      title: "Photography Fundamentals: From Beginner to Pro",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.7,
      reviewCount: 1123,
      originalPrice: 69.99,
      discountPrice: 49.99,
      students: 6840,
      lectures: 65,
      category: "Photography",
      instructor: "Alex Johnson",
      level: "Beginner",
      description:
        "Learn photography basics and advanced techniques. Master composition, lighting, and post-processing.",
      tags: ["photography", "lightroom", "composition", "editing"],
    },
    {
      id: 8,
      title: "Business Analytics & Data Visualization",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.8,
      reviewCount: 876,
      originalPrice: 89.99,
      students: 5430,
      lectures: 92,
      category: "Business",
      instructor: "Robert Chen",
      level: "Intermediate",
      description:
        "Learn how to analyze business data and create compelling visualizations. Master Excel, Tableau, and Power BI.",
      tags: ["analytics", "tableau", "excel", "data visualization"],
    },
    {
      id: 9,
      title: "Music Production Masterclass",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 1567,
      originalPrice: 99.99,
      discountPrice: 79.99,
      students: 8920,
      lectures: 104,
      category: "Music",
      instructor: "Lisa Williams",
      level: "All Levels",
      description:
        "Learn music production from scratch. Master DAWs, mixing, mastering, and sound design.",
      tags: ["music", "production", "mixing", "mastering"],
    },
    {
      id: 10,
      title: "Graphic Design for Beginners",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.6,
      reviewCount: 932,
      originalPrice: 69.99,
      discountPrice: 54.99,
      students: 7120,
      lectures: 76,
      category: "Design",
      instructor: "Mark Thompson",
      level: "Beginner",
      description:
        "Learn graphic design principles and tools. Master Adobe Photoshop, Illustrator, and InDesign.",
      tags: ["graphic design", "photoshop", "illustrator", "design"],
    },
    {
      id: 11,
      title: "Artificial Intelligence: Deep Learning Fundamentals",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 1245,
      originalPrice: 149.99,
      discountPrice: 119.99,
      students: 6540,
      lectures: 88,
      category: "Data Science",
      instructor: "Dr. Alan Zhang",
      level: "Advanced",
      description:
        "Dive into deep learning and neural networks. Build AI models with PyTorch and TensorFlow.",
      tags: ["ai", "deep learning", "neural networks", "python"],
    },
    {
      id: 12,
      title: "Spanish for Beginners: Complete Course",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.7,
      reviewCount: 2156,
      originalPrice: 59.99,
      discountPrice: 39.99,
      students: 14560,
      lectures: 110,
      category: "Languages",
      instructor: "Maria Garcia",
      level: "Beginner",
      description:
        "Learn Spanish from scratch. Master vocabulary, grammar, and conversation skills.",
      tags: ["spanish", "language", "beginner", "conversation"],
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen font-poppins">
      <div className="bg-white dark:bg-[#0C111B] min-h-screen transition-colors duration-200">
        {/* Header */}
        <div className="dark:bg-gradient-to-r from-[#151f38] to-[#1a2342] py-16 relative overflow-hidden border-b border-gray-400 dark:border-gray-600">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                Expand Your Skills
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                Explore Our Courses
              </h1>
              <p className="text-slate-800 dark:text-gray-300 text-lg mb-8">
                Discover courses taught by industry experts and take your skills
                to the next level
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  className="pl-12 py-6 bg-white/10 backdrop-blur-sm border-gray-600 text-white rounded-lg focus:ring-[rgb(37,150,190)] focus:border-[rgb(37,150,190)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>

        <Container>
          <main className="container mx-auto  py-12">
            {/* Filters and Sorting */}

            <div className="flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <select
                className="bg-transparent border-none text-slate-700 dark:text-slate-300 dark:*:text-black focus:outline-none focus:ring-0"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Course Grid */}

            {isLoading ? (
              <CardSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 cursor-pointer"
              >
                {allCourses?.length > 0 ? (
                  allCourses?.map((course: any, idx: number) => (
                    <motion.div
                      key={idx}
                      className="bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 flex flex-col lg:h-[440px]"
                    >
                      {/* Course Image */}
                      <div className="relative overflow-hidden">
                        <BlurFade key={idx} delay={0.25 + 1 * 0.05} inView>
                          <Image
                            src={course?.thumbnail?.url}
                            alt={course.name || "Course Image"}
                            width={350}
                            height={200}
                            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </BlurFade>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-[rgb(37,150,190)] text-white">
                            {course?.category}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gray-900/80 text-white">
                            {course?.level}
                          </Badge>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {course?.name}
                        </h3>

                        {/* Instructor */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          By ELearning
                        </p>

                        {/* Description */}
                        {/* <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {course.lectures}
                      </p> */}

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                          <div className="flex mr-2">
                            {renderStars(course?.ratings)}
                          </div>
                          <span className="text-[rgb(37,150,190)] font-medium">
                            {course?.ratings ? course?.ratings.toFixed(1) : ''}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                            ({course?.reviews?.length} reviews)
                          </span>
                        </div>

                        {/* Price and Stats */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              {course?.estimatedPrice ? (
                                <div className="flex items-center">
                                  <span className="text-[rgb(37,150,190)] font-bold text-xl">
                                    ${course?.price}
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400 line-through ml-2">
                                    ${course?.estimatedPrice}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[rgb(37,150,190)] font-bold text-xl">
                                  ${course?.price}
                                </span>
                              )}
                            </div>

                            {/* Students & Lectures */}
                            <div className="text-right">
                              <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm">
                                <Users className="h-4 w-4 mr-1" />
                                {/* <span>{course.students.toLocaleString()}</span> */}
                                {course?.purchased}
                              </div>
                              <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm mt-1">
                                <BookOpen className="h-4 w-4 mr-1" />
                                <span> {course?.courseData?.length} lectures</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="mt-4">
                          <Link href={`/courses/${course?._id}`}>
                            <Button className="cursor-pointer w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <div className="text-center py-16">
                      <div className="bg-gray-100 dark:bg-[#1a2342]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        No courses found
                      </h3>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </main>
        </Container>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#151f38] to-[#1a2342] py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Not Sure Where to Start?
              </h2>
              <p className="text-gray-300 mb-6">
                Take our quick assessment to get personalized course
                recommendations based on your goals and skill level.
              </p>
              <Button className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                Take Skill Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
