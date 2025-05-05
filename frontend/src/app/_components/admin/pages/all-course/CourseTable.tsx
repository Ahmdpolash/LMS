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

interface Course {
  id: string;
  title: string;
  rating: number;
  purchased: number;
  createdAt: string;
  status: "published" | "draft" | "archived";
}

export default function CourseTable() {
  // Mock data for courses
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "WEB-1234",
      title: "Complete Web Development Bootcamp",
      rating: 4.8,
      purchased: 15420,
      createdAt: "2025-04-15",
      status: "published",
    },
    {
      id: "DS-5678",
      title: "Data Science & Machine Learning Fundamentals",
      rating: 4.9,
      purchased: 12350,
      createdAt: "2025-03-22",
      status: "published",
    },
    {
      id: "UI-9012",
      title: "UI/UX Design Masterclass",
      rating: 4.7,
      purchased: 8750,
      createdAt: "2025-02-18",
      status: "published",
    },
    {
      id: "JS-3456",
      title: "Advanced JavaScript: From Fundamentals to Mastery",
      rating: 4.9,
      purchased: 10840,
      createdAt: "2025-01-30",
      status: "published",
    },
    {
      id: "MKT-7890",
      title: "Digital Marketing Strategy & Social Media",
      rating: 4.6,
      purchased: 7650,
      createdAt: "2024-12-12",
      status: "published",
    },
    {
      id: "RN-2345",
      title: "Mobile App Development with React Native",
      rating: 4.8,
      purchased: 9320,
      createdAt: "2024-11-05",
      status: "draft",
    },
    {
      id: "PY-6789",
      title: "Python for Data Analysis and Visualization",
      rating: 4.7,
      purchased: 11250,
      createdAt: "2024-10-20",
      status: "published",
    },
    {
      id: "AI-0123",
      title: "Artificial Intelligence and Deep Learning",
      rating: 4.9,
      purchased: 6540,
      createdAt: "2024-09-15",
      status: "draft",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
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
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow
                    key={course.id}
                    className=" hover:bg-gray-50  dark:hover:bg-gray-800/50"
                  >
                    <TableCell className="font-medium text-center">
                      {course.id}
                    </TableCell>
                    <TableCell className=" truncate text-center">
                      {course.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {renderStars(course.rating)}
                    </TableCell>
                    <TableCell className="text-center">
                      {course.purchased.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {formatDate(course.createdAt)}
                    </TableCell>

                    <TableCell className="text-righ">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                          onClick={() => handleDelete(course.id)}
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
