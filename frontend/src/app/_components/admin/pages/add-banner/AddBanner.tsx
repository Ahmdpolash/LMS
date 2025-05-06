"use client";

import type React from "react";

import { useState } from "react";
import { Upload, Save, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "banner-1",
      title: "Improve Your Online Learning Experience Better Instantly",
      subtitle:
        "We have 20k+ Online courses & 500K+ Online registered student. Find your desired Courses from them.",
      image: "/placeholder.svg?height=400&width=600",
      isActive: true,
      createdAt: "2025-04-15",
    },
    {
      id: "banner-2",
      title: "Learn New Skills From Anywhere",
      subtitle:
        "Join thousands of students and start your learning journey today with our expert instructors.",
      image: "/placeholder.svg?height=400&width=600",
      isActive: false,
      createdAt: "2025-03-22",
    },
  ]);

  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);

      // Update the form state
      setNewBanner({
        ...newBanner,
        image: fileUrl,
      });
    }
  };

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBanner({
      ...newBanner,
      [name]: value,
    });
  };

  // Function to add a new banner
  const handleAddBanner = () => {
    if (!newBanner.title || !newBanner.subtitle || !newBanner.image) {
      alert("Please fill all fields and upload an image");
      return;
    }

    const newBannerItem: Banner = {
      id: `banner-${Date.now()}`,
      title: newBanner.title,
      subtitle: newBanner.subtitle,
      image: newBanner.image,
      isActive: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setBanners([...banners, newBannerItem]);

    // Reset form
    setNewBanner({
      title: "",
      subtitle: "",
      image: "",
    });
    setSelectedFile(null);
    setPreviewUrl("");
  };

  // Function to toggle banner active status
  const toggleBannerStatus = (id: string) => {
    setBanners(
      banners.map((banner) => {
        if (banner.id === id) {
          return { ...banner, isActive: !banner.isActive };
        }
        // If we're activating a banner, deactivate all others
        if (banner.id !== id && !banners.find((b) => b.id === id)?.isActive) {
          return { ...banner, isActive: false };
        }
        return banner;
      })
    );
  };

  // Function to delete a banner
  const handleDeleteBanner = (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((banner) => banner.id !== id));
    }
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
                    {banners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell className="font-medium">
                          {banner.id}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {banner.title}
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate hidden md:table-cell">
                          {banner.subtitle}
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
                                banner.isActive
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                              }
                            >
                              {banner.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(banner.createdAt)}
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
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                              onClick={() => handleDeleteBanner(banner.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
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
          <BannerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
