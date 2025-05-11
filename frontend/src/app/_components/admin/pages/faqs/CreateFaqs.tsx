"use client";

import type React from "react";

import { format } from "timeago.js";

import { Trash2, Eye } from "lucide-react";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetAllLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import Link from "next/link";

import { toast } from "sonner";
import FaqForm from "./FaqForm";

export default function CreateFaqs() {
  const { data } = useGetAllLayoutByTypeQuery("Faq");

  const handleDelete = () => {
    toast.error("Feature coming soon! 🚀");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        FAQ Management
      </h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All FAQ</TabsTrigger>
          <TabsTrigger className="" value="add">
            Add New FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="dark:bg-[#020817]">
            <CardHeader>
              <CardTitle>All FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-center">
                        No
                      </TableHead>
                      <TableHead className="text-center">Question</TableHead>
                      <TableHead className="text-center">Category</TableHead>

                      <TableHead className="hidden md:table-cell text-center">
                        Created
                      </TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.faq?.map((item: any, index: number) => (
                      <TableRow>
                        <TableCell className="font-medium text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-center">
                          {item.question}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-center">
                          {item.category}
                        </TableCell>

                        <TableCell className="hidden md:table-cell text-center">
                          {format(item?.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Link href={`/faq`}>
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
                              onClick={handleDelete}
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
          <FaqForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
