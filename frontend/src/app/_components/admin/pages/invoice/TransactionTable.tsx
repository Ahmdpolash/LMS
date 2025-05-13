"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Search, Plus, Star, Download, Mail } from "lucide-react";
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
import { format } from "timeago.js";
import Link from "next/link";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/course/courseApi";
import { toast } from "sonner";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";

interface Course {
  id: string;
  title: string;
  rating: number;
  purchased: number;
  createdAt: string;
  status: "published" | "draft" | "archived";
}

export default function TransactionTable({
  isDashboard,
}: {
  isDashboard?: boolean;
}) {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const { data: userInfo } = useGetAllUsersQuery({});
  const { data: orderInfo } = useGetAllOrdersQuery({});

  // console.log(data, "course");
  // console.log(userInfo, "userInfo");
  // console.log(orderInfo, "orderInfo");

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (orderInfo) {
      const temp = orderInfo?.data?.map((item: any) => {
        const user = userInfo?.data?.find(
          (user: any) => user._id == item.userId
        );
        const course = data?.data?.find(
          (course: any) => course._id == item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, userInfo, orderInfo]);

  // search

  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  //   const filteredCourses = courses.filter(
  //     (course) =>
  //       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       course.id.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  return (
    <div className={`${isDashboard ? "p-0" : "p-4"}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1
          className={`${
            isDashboard ? "text-xl font-semibold" : "text-2xl font-bold "
          } text-gray-900 dark:text-white`}
        >
          {!isDashboard ? " Invoices" : "Last Transaction"}
        </h1>

        {!isDashboard && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search Invoice..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden border-gray-200 dark:border-gray-800 ">
        <div className="overflow-x-auto rounded-sm shadow-md">
          <Table>
            <TableHeader className="bg-[#363A89] p-4 ">
              <TableRow className="hover:bg-[#363A89]/90 border-b-0 ">
                <TableHead className="text-white font-medium text-center">
                  Transaction ID
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Student
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Course
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Amount
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Time
                </TableHead>

                <TableHead className="text-white font-medium text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-[#1B2537] divide-y divide-gray-200 dark:divide-gray-700 ">
              {!isLoading ? (
                <>
                  {orderData?.length > 0 ? (
                    orderData?.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        className=" hover:bg-gray-50  dark:hover:bg-gray-800/50"
                      >
                        <TableCell className="font-medium text-center">
                          {item?.courseId}
                        </TableCell>
                        <TableCell className=" truncate text-center">
                          {item?.userName}
                        </TableCell>
                        <TableCell className="text-center">
                          {" "}
                          {item?.title}
                        </TableCell>
                        <TableCell className="text-center">
                          {" "}
                          {item?.price}
                        </TableCell>
                        <TableCell className="text-center hidden md:table-cell">
                          {format(item?.createdAt)}
                        </TableCell>

                        <TableCell className="flex justify-center gap-2">
                         
                            <a
                              href={`mailto:${item?.userEmail}`}
                              target="_blank"
                            >
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 cursor-pointer"
                              >
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </a>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="cursor-pointer h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                     
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No {!isDashboard ? "Invoices" : "Transaction"} found.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ) : (
                <div className="flex justify-center  items-center my-10 w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
