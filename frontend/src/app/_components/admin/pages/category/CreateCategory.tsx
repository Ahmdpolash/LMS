"use client";

import type React from "react";

import { format } from "timeago.js";

import {
  Trash2,
  Eye,
  Edit,
  Delete,
  DeleteIcon,
  LucideDelete,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetAllLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import Link from "next/link";
import BannerForm from "../add-banner/BannerForm";
import { FiDelete } from "react-icons/fi";
import CategoryForm from "./CategoryForm";
import Image from "next/image";
// import { Switch } from "@/components/ui/switch";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export default function CreateCategory() {
  const { data } = useGetAllLayoutByTypeQuery("Category");
  console.log(data);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Category Management
      </h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger className="" value="add">
            Add New Category
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="dark:bg-[#020817]">
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-center">
                        No
                      </TableHead>
                      <TableHead className="text-center">Name</TableHead>
                      <TableHead className="text-center">Image</TableHead>

                      <TableHead className="hidden md:table-cell text-center">
                        Created
                      </TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.categories?.map((item: any, index: number) => (
                      <TableRow>
                        <TableCell className="font-medium text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-center">
                          {item.title}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate ">
                          <Image
                            src={item?.image}
                            height={50}
                            width={50}
                            alt={"category"}
                            className="h-[40px] w-[40px] rounded-full mx-auto"
                          />
                        </TableCell>

                        <TableCell className="hidden md:table-cell text-center">
                          {format(item?.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Link href={`/`}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </Link>
                            
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <CategoryForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
