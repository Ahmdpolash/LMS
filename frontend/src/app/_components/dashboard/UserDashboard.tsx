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
  console.log(courseInfo);

  const handleDownload = () => {
    // const url = `https://drive.google.com/uc?export=download&id=${id}`;
    // window.location.href = url;

    toast.success("This Feature Will be added soon 🚀");
  };

  return (
    <div className=" p-4 bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg overflow-x-auto lg:overflow-x-hidden">
      {/* Welcome Section */}
      <div className="">
        <div className=" mb-4">
          <div className="flex items-center justify-between ">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {courseInfo?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400  text-sm">
              Last login: 5 Minute Ago
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
                  0
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
                  0
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
                  10 days
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

                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseInfo?.courses?.length > 0 ? (
                  courseInfo.courses?.map((course: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {course?.courseId._id.slice(0, 8)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {course.courseId.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {format(course?.purchasedDate || "-")}
                      </TableCell>
                      <TableCell>${course?.courseId.price}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            course.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          Active
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
                          <Link href={`/course-access/${course?.courseId._id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 cursor-pointer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Go to Course</span>
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
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
