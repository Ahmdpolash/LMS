"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Award,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Globe,
  Heart,
  Info,
  Layers,
  Lock,
  Play,
  Share2,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetSingleCourseQuery } from "@/redux/features/course/courseApi";

import { format } from "timeago.js";
import { ICourse } from "@/types";
import { courseData } from "@/constant/coursemockdata";
import TabsSection from "./TabsSection";
import { renderStars } from "./RenderStar";

export default function CourseDetails({ slug }: { slug: string }) {
  const { data, isLoading } = useGetSingleCourseQuery(slug);
  const [courseInfo, setCurseInfo] = useState<any>();

  useEffect(() => {
    if (data) {
      const updatedData = data?.data;
      setCurseInfo(updatedData);
    }
  }, [data]);

  return (
    <div className="min-h-screen font-poppins">
      <div className=" transition-colors duration-200">
        {/* Course Header */}
        <section className=" py-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Course Info */}
              <div className="lg:w-7/12">
                <div className="flex items-center mb-4">
                  <Badge className="bg-[rgb(37,150,190)] text-white mr-2">
                    Bestseller
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-gray-500"
                  >
                    {courseInfo?.level}
                  </Badge>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {courseInfo?.name}
                </h1>

                <p className="text-gray-300 text-[17px] mb-6">
                  {courseInfo?.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(courseInfo?.ratings, "md")}
                    </div>
                    <span className="text-[rgb(37,150,190)] font-medium">
                      {courseInfo?.ratings}
                    </span>
                    <span className="text-gray-300 ml-1">
                      ({courseInfo?.reviews?.length} reviews)
                    </span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{courseInfo?.purchased} students</span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 mr-1" />
                    <span>Last updated {format(courseInfo?.updatedAt)}</span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Globe className="h-5 w-5 mr-1" />
                    <span> {courseInfo?.language || "English"}</span>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={"/logo2.png"} alt={"eLearning"} />
                    <AvatarFallback>ELearning</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">Created by</p>
                    <Link
                      href={`/instructor/${courseData.instructor.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-[rgb(37,150,190)] hover:underline"
                    >
                      ELearning
                    </Link>
                  </div>
                </div>
              </div>

              {/* Course Preview Card */}
              <div className="lg:w-5/12">
                <div className="bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <Image
                      src={courseInfo?.thumbnail?.url || "/logo2.png"}
                      alt={courseInfo?.name}
                      width={700}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        variant="outline"
                        className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30"
                      >
                        <Play className="h-5 w-5 mr-2" fill="white" />
                        Preview Course
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${courseInfo?.price}
                        </span>
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                          ${courseInfo?.estimatedPrice}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-red-500 border-red-500"
                      >
                        {Math.round(
                          (1 - courseInfo?.price / courseInfo?.estimatedPrice) *
                            100
                        )}
                        % off
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Sale ends in 20 days!
                    </p>

                    <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white mb-3 cursor-pointer">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>

                    <Button variant="outline" className="w-full mb-6">
                      Try For Free
                    </Button>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      30-Day Money-Back Guarantee
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Duration:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseData.duration}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Layers className="h-4 w-4 inline mr-1" />
                          Lectures:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseInfo?.courseData?.length}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <FileText className="h-4 w-4 inline mr-1" />
                          Articles:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          0
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Download className="h-4 w-4 inline mr-1" />
                          Resources:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseInfo?.courseData?.length}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Award className="h-4 w-4 inline mr-1" />
                          Certificate:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          Yes, upon completion
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        Wishlist
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Gift
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-8/12">
                {/* Tabs Navigation */}
                <TabsSection courseInfo={courseInfo} />
              </div>

              {/* Related Courses */}
              <div className="lg:w-4/12">
                <div className="sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Courses
                  </h3>

                  <div className="space-y-4">
                    {courseData.relatedCourses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/${course.id}`}
                        className="block bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                      >
                        <div className="flex">
                          <div className="w-1/3 relative">
                            <Image
                              src={"/c.jpg"}
                              alt="course image"
                              width={200}
                              height={120}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                              {course.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {course.instructor}
                            </p>
                            <div className="flex items-center mb-2">
                              <div className="flex mr-1">
                                {renderStars(course.rating)}
                              </div>
                              <span className="text-xs text-[rgb(37,150,190)]">
                                {course.rating}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                ({course.reviewCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              {course.discountPrice ? (
                                <>
                                  <span className="text-sm font-medium text-[rgb(37,150,190)]">
                                    ${course.discountPrice}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 line-through ml-1">
                                    ${course.price}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm font-medium text-[rgb(37,150,190)]">
                                  ${course.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
