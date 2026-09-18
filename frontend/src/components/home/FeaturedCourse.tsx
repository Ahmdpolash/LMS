"use client";

import Image from "next/image";
import { Star, Users, BookOpen, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";
import SectionHeaders from "./SectionHeaders";
import { motion } from "framer-motion";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import Link from "next/link";
import CardSkeleton from "../shared/CardSkeleton";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-3.5 w-3.5 text-gray-300" />
        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    );
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />);
  }
  return stars;
}

export default function FeaturedCourse() {
  const { data, isLoading } = useGetAllCoursesQuery({});

  return (
    <section className="py-16 border-b border-gray-400 dark:border-gray-700 bg-white dark:bg-[#0C111B]">
      <Container>
        <SectionHeaders
          badge="Learn From The Best"
          description="Explore our top-rated courses designed by industry experts to help you master new skills and advance your career."
          title1="Popular Courses"
          title2="to Boost Your Skills"
        />

        {isLoading ? (
          <CardSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data?.data?.length > 0 ? (
              data.data.slice(0, 6).map((course: any, idx: number) => (
                <motion.div key={course._id} variants={cardVariants}>
                  <Link href={`/courses/${course._id}`} className="block h-full">
                    <div className="group relative bg-white dark:bg-[#1a2342] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-[rgb(37,150,190)]/40 shadow-sm hover:shadow-xl hover:shadow-[rgb(37,150,190)]/10 transition-all duration-400 flex flex-col h-full">

                      {/* Image */}
                      <div className="relative overflow-hidden h-48">
                        <Image
                          src={course?.thumbnail?.url || "/alt.jpg"}
                          alt={course?.name}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-[rgb(37,150,190)] text-white text-xs font-medium">
                            {course?.category}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black/70 backdrop-blur-sm text-white text-xs">
                            {course?.level}
                          </Badge>
                        </div>

                        {/* Hot badge for first card */}
                        {idx === 0 && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            <Zap className="h-3 w-3 fill-white" />
                            Bestseller
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1 gap-3">
                        <h3 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-2 group-hover:text-[rgb(37,150,190)] transition-colors duration-200">
                          {course?.name}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          By <span className="text-[rgb(37,150,190)] font-medium">ELearning</span>
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex">{renderStars(course?.ratings)}</div>
                          <span className="text-amber-500 text-xs font-semibold">
                            {course?.ratings?.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500 text-xs">
                            ({course?.reviews?.length || 0})
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 dark:bg-gray-700/60 mt-auto" />

                        {/* Price & Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[rgb(37,150,190)] font-bold text-xl">
                              ${course?.price}
                            </span>
                            {course?.estimatedPrice && (
                              <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
                                ${course?.estimatedPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {course?.purchased || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3.5 w-3.5" />
                              {course?.courseData?.length}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/85 text-white font-medium transition-all duration-200 group-hover:shadow-md group-hover:shadow-[rgb(37,150,190)]/20 rounded-xl">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 text-gray-500 dark:text-gray-400">
                No courses available yet.
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <Link href="/courses">
            <Button
              variant="outline"
              className="cursor-pointer border-[rgb(37,150,190)] text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/10 group px-8 py-5 rounded-xl"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
