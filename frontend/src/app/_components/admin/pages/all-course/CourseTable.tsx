"use client";

import { useState } from "react";
import { Edit, Trash2, Search, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/course/courseApi";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  rating: number;
  purchased: number;
  createdAt: string;
  status: "published" | "draft" | "archived";
}

export default function CourseTable() {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [deleteCourse, { isSuccess }] = useDeleteCourseMutation();
  console.log(data, "data from course table");

  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  //   const filteredCourses = courses.filter(
  //     (course) =>
  //       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       course.id.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="font-medium mr-1">{rating}</span>
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      </div>
    );
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Function to handle course deletion
  const handleDelete = async (id: string) => {
    const res = await deleteCourse(id);
    if (res?.data?.success) {
      toast.success("Course deleted successfully!");
    } else {
      toast.error("Failed to delete course. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Courses
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Link href="/admin/create-course">
            <Button className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden border-gray-200 dark:border-gray-800 ">
        <div className="overflow-x-auto rounded-sm shadow-md">
          <Table>
            <TableHeader className="bg-[#363A89] p-4 ">
              <TableRow className="hover:bg-[#363A89]/90 border-b-0 ">
                <TableHead className="text-white font-medium text-center">
                  ID
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Course Title
                </TableHead>
                <TableHead className="text-white font-medium ">
                  Rating
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Purchased
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Created At
                </TableHead>

                <TableHead className="text-white font-medium text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-[#1B2537] divide-y divide-gray-200 dark:divide-gray-700 ">
              {!isLoading ? (
                <>
                  {data?.data?.length > 0 ? (
                    data?.data?.map((course: any) => (
                      <TableRow
                        key={course._id}
                        className=" hover:bg-gray-50  dark:hover:bg-gray-800/50"
                      >
                        <TableCell className="font-medium text-center">
                          {course._id}
                        </TableCell>
                        <TableCell className=" truncate text-center">
                          {course?.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {renderStars(course?.ratings)}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.purchased.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center hidden md:table-cell">
                          {formatDate(course?.createdAt)}
                        </TableCell>

                        <TableCell className="text-righ">
                          <div className="flex justify-center gap-2">
                            <Link href={`/admin/courses/edit/${course._id}`}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 cursor-pointer"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="cursor-pointer h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                              onClick={() => handleDelete(course._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No courses found.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center my-10 w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
