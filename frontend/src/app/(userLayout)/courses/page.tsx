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
import { useGetAllLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";

export default function CoursesPage() {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const { data: categoriesData } = useGetAllLayoutByTypeQuery("Category", {});
  const categories = categoriesData?.data?.categories;
  const [category, setCategory] = useState("All");
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("popular");

  useEffect(() => {
    if (categoryQuery) {
      setCategory(categoryQuery);
    }
  }, [categoryQuery]);

  // search and filtering
  const filteredAndSortedCourses = data?.data
    ?.filter((course: any) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a: any, b: any) => {
      switch (sortBy) {
        case "rating":
          return b.ratings - a.ratings;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return b.purchased - a.purchased; // most popular
      }
    })
    ?.filter((course: any) =>
      category === "All" ? true : course.category === category
    );

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
                  placeholder="Search any courses you want"
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
          <main className="container mx-auto py-8">
            {/* Filters and Sorting */}

            <div className="flex items-center justify-between">
              <div className="hidden lg:flex items-center flex-wrap gap-3 ">
                <div
                  className={`h-[35px] ${
                    category === "All" ? "bg-[crimson]" : "bg-[#5050cb] ]"
                  } px-3  rounded-[25px] flex items-center justify-center font-Poppins cursor-pointer`}
                  onClick={() => setCategory("All")}
                >
                  All
                </div>
                {categories &&
                  categories?.slice(0,5)?.map((item: any, index: number) => (
                    <div key={index}>
                      <div
                        className={`h-[35px] ${
                          category === item?.title
                            ? "bg-[crimson]"
                            : "bg-[#5050cb]"
                        } m- px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                        onClick={() => setCategory(item?.title)}
                      >
                        {item?.title}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <select
                  className="bg-transparent  lg:border-none text-slate-700 dark:text-slate-300 dark:*:text-black focus:outline-none focus:ring-0"
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
            </div>

            {filteredAndSortedCourses?.length === 0 && (
              <div>
                <div className="text-center py-16 mt-5 mx-auto flex justify-center items-center">
                  <div>
                    <div className="bg-gray-100 dark:bg-[#1a2342]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      No courses found
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Course Grid */}
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
              >
                {filteredAndSortedCourses?.map((course: any, idx: number) => (
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
                          {course?.ratings ? course?.ratings.toFixed(1) : ""}
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
                              <span>
                                {" "}
                                {course?.courseData?.length} lectures
                              </span>
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
                ))}
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
