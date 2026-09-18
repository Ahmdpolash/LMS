"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { format } from "timeago.js";
import { toast } from "sonner";

export default function StudentDashboard() {
  const { data } = useCurrentUserQuery({});
  const courseInfo = data?.data;

  // Compute total hours learned from completed lessons
  const totalMinutesLearned = (courseInfo?.courses || []).reduce(
    (total: number, courseItem: any) => {
      const completedLessons: string[] = courseItem?.completedLessons || [];
      const courseData: any[] = courseItem?.courseId?.courseData || [];
      const courseMinutes = courseData
        .filter((lesson: any) =>
          completedLessons.includes(lesson._id?.toString())
        )
        .reduce((sum: number, lesson: any) => sum + (lesson.videoLength || 0), 0);
      return total + courseMinutes;
    },
    0
  );

  const hoursLearned =
    totalMinutesLearned > 0
      ? totalMinutesLearned >= 60
        ? `${(totalMinutesLearned / 60).toFixed(1)} hrs`
        : `${totalMinutesLearned} min`
      : "0 hrs";

  // Certificates: completed courses count
  const certificatesCount = (courseInfo?.courses || []).filter(
    (course: any) =>
      course?.progress === 100 || course?.status === "Completed"
  ).length;

  // Day streak
  const streakDays = courseInfo?.loginStreak?.currentStreak || 1;

  const handleDownload = () => {
    toast.success("This Feature Will be added soon 🚀");
  };

  return (
    <div className=" p-4 bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg overflow-x-auto lg:overflow-x-hidden">
      {/* Welcome Section */}
      <div className="">
        <div className=" mb-4">
          <div className="flex items-center justify-between ">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {courseInfo?.name || "Student"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last login:{" "}
              {courseInfo?.lastLogin
                ? format(courseInfo.lastLogin)
                : "Just now"}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a2342] border-gray-100 dark:border-gray-800">
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enrolled Courses
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {courseInfo?.courses?.length || 0}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a2342] border-gray-100 dark:border-gray-800">
            <CardContent className="p-4 flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hours Learned
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {hoursLearned}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a2342] border-gray-100 dark:border-gray-800">
            <CardContent className="p-4 flex items-center">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Certificates
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {certificatesCount}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a2342] border-gray-100 dark:border-gray-800">
            <CardContent className="p-4 flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Day Streak
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {streakDays} {streakDays === 1 ? "day" : "days"}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purchased Courses Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Purchased Courses
        </h2>

        <Card className="bg-white dark:bg-[#1a2342] border-gray-100 dark:border-gray-800">
          <div className="overflow-x-auto">
            <Table className="">
              {courseInfo?.courses?.length === 0 && (
                <TableCaption>
                  No courses purchased yet. Browse our catalog to find courses.
                </TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Course ID</TableHead>
                  <TableHead className="min-w-[200px]">Course Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Purchase Date
                  </TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseInfo?.courses?.length > 0 ? (
                  courseInfo.courses?.map((course: any, idx: number) => {
                    const isCompleted =
                      course?.progress === 100 || course?.status === "Completed";
                    const courseName = course?.courseId?.name || "Course";
                    const courseIdDisplay = course?.courseId?._id
                      ? course.courseId._id.slice(0, 8)
                      : String(course?.courseId || "").slice(0, 8);
                    const courseTargetId =
                      course?.courseId?._id || course?.courseId;

                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {courseIdDisplay}
                        </TableCell>
                        <TableCell className="font-medium">
                          {courseName}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {course?.purchasedDate
                            ? format(course.purchasedDate)
                            : "-"}
                        </TableCell>
                        <TableCell>${course?.courseId?.price || 0}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold">
                              {course?.progress || 0}%
                            </span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  isCompleted ? "bg-emerald-500" : "bg-purple-500"
                                }`}
                                style={{ width: `${course?.progress || 0}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              isCompleted
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }
                          >
                            {isCompleted ? "Completed" : "In Progress"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1 md:space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 cursor-pointer"
                              onClick={handleDownload}
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download Resources</span>
                            </Button>
                            {courseTargetId && (
                              <Link href={`/course-access/${courseTargetId}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 cursor-pointer"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="sr-only">Go to Course</span>
                                </Button>
                              </Link>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                          <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No Courses Purchased
                        </h3>

                        <Link href={"/courses"}>
                          <Button className="cursor-pointer bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                            Browse Courses
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
