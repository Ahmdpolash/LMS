"use client";

import { useState } from "react";
import { Edit, Trash2, Search, Plus, Star, Mail } from "lucide-react";
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

import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";
import { ChangeRoleModal } from "./ChangeRoleModal";

interface Course {
  id: string;
  title: string;
  rating: number;
  purchased: number;
  createdAt: string;
  status: "published" | "draft" | "archived";
}

export default function TeamTable() {
  const { data: users, isLoading } = useGetAllUsersQuery({});

  const [deleteUser] = useDeleteUserMutation();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.data?.filter(
    (user: any) => user?.role === "admin"
  );

  // Function to handle course deletion
  const handleDelete = async (id: string) => {
    const res = await deleteUser(id);
    if (res?.data?.success) {
      toast.success("User deleted successfully!");
    } else {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage All Elearning Platform Users
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ChangeRoleModal users={users} />
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
                  Name
                </TableHead>
                <TableHead className="text-white text-center font-medium ">
                  Email
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Role
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Courses
                </TableHead>
                <TableHead className="text-white font-medium text-center">
                  Joined At
                </TableHead>

                <TableHead className="text-white font-medium text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            {!isLoading ? (
              <TableBody className="bg-white dark:bg-[#1B2537] divide-y divide-gray-200 dark:divide-gray-700 ">
                {filteredUsers?.length > 0 ? (
                  filteredUsers?.map((user: any) => (
                    <TableRow
                      key={user?._id}
                      className=" hover:bg-gray-50  dark:hover:bg-gray-800/50"
                    >
                      <TableCell className="font-medium text-center">
                        {user?.userId || "N/A"}
                      </TableCell>
                      <TableCell className=" truncate text-center">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {user?.role}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.courses?.length}
                      </TableCell>

                      <TableCell className="text-center hidden md:table-cell">
                        {format(user.createdAt)}
                      </TableCell>

                      <TableCell className="text-righ">
                        <div className="flex justify-center gap-2">
                          <a href={`mailto:${user?.email}`} target="_blank">
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
                            disabled={user?.role === "admin"}
                            variant="ghost"
                            className="cursor-pointer h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            onClick={() => handleDelete(user._id)}
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
            ) : (
              <div className="grid place-items-center  mx-auto text-center">
                <div className=" my-10 w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
              </div>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
