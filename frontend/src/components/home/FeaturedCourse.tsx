"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";
import SectionHeaders from "./SectionHeaders";
import { courses } from "@/constant";
import { motion } from "framer-motion";
export default function FeaturedCourse() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    <section className="py-16 border-b border-gray-400 dark:border-gray-700 bg-white dark:bg-[#0C111B]">
      <Container>
        <div className="container mx-auto ">
          <SectionHeaders
            badge="Learn From The Best"
            description=" Explore our top-rated courses designed by industry experts to help
              you master new skills and advance your career."
            title1="Popular Courses"
            title2="to Boost Your Skills"
          />

          {/* Course Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-sm border border-gray-300 dark:border-gray-800 hover:shadow-lg transition-all duration-300 flex flex-col lg:h-[460px]"
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={"/c.jpg"}
                    alt={course.title}
                    width={350}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500"
                    style={{
                      transform:
                        hoveredCard === course.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[rgb(37,150,190)] text-white">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gray-900/80 text-white">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    By {course.instructor}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-[rgb(37,150,190)] font-medium">
                      {course.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                      ({course.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price and Stats */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between ">
                      <div>
                        {course.discountPrice ? (
                          <div className="flex items-center">
                            <span className="text-[rgb(37,150,190)] font-bold text-xl">
                              ${course.discountPrice}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 line-through ml-2">
                              ${course.originalPrice}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[rgb(37,150,190)] font-bold text-xl">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Students & Lectures */}
                      <div className="text-right space-y-2">
                        <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm mt-1">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{course.lectures} lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Button - Now in its own container at the bottom */}
                  <div className="">
                    <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <div className="mt-12 text-center ">
            <Button
              variant="outline"
              className="cursor-pointer border-[rgb(37,150,190)] text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/10 group"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
