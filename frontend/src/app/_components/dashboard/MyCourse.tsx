"use client";

import { useState } from "react";
import { Search, Filter, Clock, Award, BookOpen } from "lucide-react";
import Image from "next/image";
import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { format } from "timeago.js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Course type definition
type Course = {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  purchaseDate: string;
};

export default function MyCourses() {
  const { data, isLoading } = useCurrentUserQuery({});
  const courseInfo = data?.data;

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = (courseInfo?.courses || []).filter((course: any) => {
    const courseName = course?.courseId?.name || "";
    const matchesSearch = courseName
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    const progress = course?.progress || 0;
    const isCompleted = progress === 100 || course?.status === "Completed";

    if (!matchesSearch) return false;

    if (filter === "in-progress") {
      return progress > 0 && !isCompleted;
    }
    if (filter === "completed") {
      return isCompleted;
    }
    if (filter === "not-started") {
      return progress === 0;
    }
    return true;
  });

  return (
    <div className="  bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg text-white p-4 md:p-6  mx-auto min-h-[calc(100vh-260px)]">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
            My Courses
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white dark:bg-[#1a1525] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white dark:bg-[#1a1525] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-700/50" />

        {/* Courses Grid */}

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        )}

        {!isLoading && filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredCourses.map((course: any, idx: number) => {
              const progress = course?.progress || 0;
              const isCompleted =
                progress === 100 || course?.status === "Completed";
              const courseTargetId =
                course?.courseId?._id || course?.courseId;
              const courseName = course?.courseId?.name || "Course";

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#1a1525] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-colors flex flex-col sm:flex-row py-5 px-5 gap-4 shadow-sm"
                >
                  <div className="shrink-0 flex items-center justify-center">
                    <Image
                      src={course?.courseId?.thumbnail?.url || "/c.jpg"}
                      alt={courseName}
                      width={200}
                      height={130}
                      className="object-cover w-full sm:w-[170px] h-[120px] rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-[16px] line-clamp-2">
                        {courseName}
                      </h3>

                      <div className="flex items-center text-xs text-slate-600 dark:text-gray-400 mt-1">
                        <span className="font-semibold">ELearning</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-gray-800 dark:text-white">
                        <span>{progress}% complete</span>
                        {isCompleted && (
                          <span className="text-emerald-500 font-semibold text-xs">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ease-in-out duration-500 ${
                            isCompleted
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-600"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          Purchased:{" "}
                          {course?.purchasedDate
                            ? format(course.purchasedDate)
                            : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2">
                      {courseTargetId && (
                        <Link href={`/course-access/${courseTargetId}`}>
                          <button className="cursor-pointer text-xs px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-medium">
                            Continue Learning
                          </button>
                        </Link>
                      )}

                      {isCompleted && (
                        <button
                          type="button"
                          onClick={() =>
                            toast.success("Certificate is ready! Download feature coming soon.")
                          }
                          className="cursor-pointer text-xs px-2.5 py-1.5 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-md hover:bg-emerald-100 transition-colors"
                        >
                          <Award className="h-3.5 w-3.5" />
                          Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-[#1a2342]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              You have not enrolled in any Course yet
            </h3>
            <Link href={"/courses"}>
              <Button
                variant={"outline"}
                className="mt-3 bg-black dark:bg-blue-700  dark:text-white hover:bg-blue-500 cursor-pointer hover:text-white"
              >
                Enroll Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
