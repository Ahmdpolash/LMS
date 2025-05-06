"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  useEditLayoutMutation,
  useGetAllLayoutByIdQuery,
} from "@/redux/features/layout/layoutApi";
import { useParams } from "next/navigation";

const UpdateBannerForm = () => {
  const params = useParams();

  const [updateBanner, { isLoading }] = useEditLayoutMutation();
  const { data } = useGetAllLayoutByIdQuery(params.id);

  const [newBanner, setNewBanner] = useState({
    title: "",
    subTitle: "",
    image: null as null | { public_id: string; url: string },
  });

  useEffect(() => {
    if (data?.data?.banner) {
      setNewBanner({
        title: data.data.banner.title || "",
        subTitle: data.data.banner.subTitle || "",
        image: data.data.banner.image || null,
      });
      setPreview(data.data.banner.image?.url || null);
    }
  }, [data]);

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "default_preset"
    );
    formData.append("folder", "banners");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const fileObj = {
        public_id: res.data.public_id,
        url: res.data.secure_url,
      };

      setPreview(fileObj.url);
      setNewBanner((prev) => ({ ...prev, image: fileObj }));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBanner.image || !newBanner.title || !newBanner.subTitle) {
      return toast.error("Please fill all the fields");
    }

    const payload = {
      type: "Banner",
      banner: {
        image: newBanner.image,
        title: newBanner.title,
        subTitle: newBanner.subTitle,
      },
    };

    const res = await updateBanner(payload).unwrap();
    console.log(res);
    if (res?.success) {
      toast.success("Banner Updated successfully!");
      setNewBanner({
        title: newBanner.title,
        subTitle: newBanner.subTitle,
        image: newBanner.image,
      });
      setPreview(newBanner.image?.url || null);
    } else {
      toast.error("Something went wrong! Please try again or contact support.");
    }
  };




  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Update Existing Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Banner Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter banner title"
                    className="dark:placeholder:text-gray-400"
                    value={newBanner.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subTitle">Banner Subtitle</Label>
                  <Textarea
                    id="subTitle"
                    name="subTitle"
                    placeholder="Enter banner subtitle"
                    value={newBanner.subTitle}
                    className="dark:placeholder:text-gray-400"
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Banner Image</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() =>
                        document.getElementById("banner-image")?.click()
                      }
                      className="w-full cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? "Uploading..." : "Upload Image"}
                    </Button>
                    <input
                      id="banner-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recommended size: 1200x600px. Max file size: 2MB
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 h-[300px] flex items-center justify-center cursor-pointer">
                  {preview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview}
                        alt="Banner preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Upload an image to see preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white cursor-pointer"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Banner"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default UpdateBannerForm;
