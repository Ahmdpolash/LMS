"use client";

import { useState } from "react";
import { Search, Filter, Clock, Award, BookOpen } from "lucide-react";
import Image from "next/image";
import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { format } from "timeago.js";

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
  const { data } = useCurrentUserQuery({});
  const courseInfo = data?.data;



  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");


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
                className="pl-10 pr-4 py-2 w-full bg-[#1a1525] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-[#1a1525] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
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
        {courseInfo?.courses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {courseInfo.courses?.map((course: any, idx: number) => (
              <div
                key={idx}
                className="bg-[#1a1525] rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-colors flex py-6 px-5 gap-4 cursor-pointer"
              >
                <div className="">
                  <Image
                    src={course?.courseId?.thumbnail?.url || "/c.jpg"}
                    alt={course?.courseId?.name || "course thumbnail"}
                    // fill
                    width={250}
                    height={200}
                    className="object-cover w-[190px] h-[130px] rounded-lg"
                  />
                </div>

                <div className=" space-y-2">
                  <h3 className="font-medium text-[18px] line-clamp-">
                    {course?.courseId?.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-400">
                    <span className="font-semibold">ELearning</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                     
                      <span>50% complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          course.progress === 100
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        Purchased: {format(course?.courseId?.purchasedDate)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between ">
                    <Link href={`/course-access/${course?.courseId?._id}`}>
                      <button className="cursor-pointer text-sm px-3 py-1.5 bg-purple-600/50 hover:bg-purple-700 rounded-md transition-colors">
                        Continue Learning
                      </button>
                    </Link>

                    {/* <button className="cursor-pointer text-sm px-3 py-1.5 flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
                        <Award className="h-4 w-4" />
                        Certificate
                      </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No courses found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
