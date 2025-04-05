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

export default function StudentDashboard() {
  // Simulate fetching purchased courses
  // In a real app, this would be an API call
  const purchasedCourses = [
    {
      id: "WEB-1234",
      name: "Complete Web Development Bootcamp",
      date: "May 2, 2025",
      price: 84.99,
      transactionId: "TXN-98765432",
      status: "Completed",
    },
    {
      id: "DS-5678",
      name: "Data Science & Machine Learning",
      date: "April 15, 2025",
      price: 89.99,
      transactionId: "TXN-87654321",
      status: "Active",
    },
  ];

  // Mock data for the dashboard stats
  const studentData = {
    name: "Alex Johnson",
    enrolledCourses: 5,
    completedCourses: 3,
    totalHoursLearned: 47,
    certificatesEarned: 2,
    streak: 15,
    lastLogin: "2 hours ago",
  };

  return (
    <div className=" p-4 bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg overflow-x-auto lg:overflow-x-hidden">
      {/* Welcome Section */}
      <div className="">
        <div className=" mb-4">
          <div className="flex items-center justify-between ">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {studentData.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400  text-sm">
              Last login: {studentData.lastLogin}
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
                  {studentData.enrolledCourses}
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
                  {studentData.totalHoursLearned}
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
                  {studentData.certificatesEarned}
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
                  {studentData.streak} days
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
              {purchasedCourses.length === 0 && (
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
                  <TableHead className="hidden md:table-cell">
                    Transaction ID
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasedCourses.length > 0 ? (
                  purchasedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell className="font-medium">
                        {course.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {course.date}
                      </TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {course.transactionId}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            course.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1 md:space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Certificate</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Resources</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Go to Course</span>
                          </Button>
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
                        <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                          You haven't purchased any courses yet. Browse our
                          catalog to find courses that interest you.
                        </p>
                        <Button className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                          Browse Courses
                        </Button>
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
