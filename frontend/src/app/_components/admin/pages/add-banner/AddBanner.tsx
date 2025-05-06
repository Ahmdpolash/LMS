"use client";

import type React from "react";

import { format } from "timeago.js";

import { Trash2, Eye, Edit } from "lucide-react";
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
import BannerForm from "./BannerForm";
import { useGetAllLayoutByIdQuery } from "@/redux/features/layout/layoutApi";
import Link from "next/link";
// import { Switch } from "@/components/ui/switch";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export default function BannersPage() {
  const { data } = useGetAllLayoutByIdQuery("Banner");



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Banner Management
      </h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Banners</TabsTrigger>
          <TabsTrigger className="" value="add">
            Add New Banner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="bg-[#020817]">
            <CardHeader>
              <CardTitle>All Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Subtitle
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Banner 1</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {data?.data?.banner?.title}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate hidden md:table-cell">
                        {data?.data?.banner?.subTitle}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {/* <Switch
                              checked={banner.isActive}
                              onCheckedChange={() =>
                                toggleBannerStatus(banner.id)
                              }
                            /> */}
                          <Badge
                            className={
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }
                          >
                            Active
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(data?.data?.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Link
                            href={`/admin/banner/edit/${data?.data?._id}`}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <BannerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
