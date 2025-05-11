import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { useCreateLayoutMutation } from "@/redux/features/layout/layoutApi";

const CategoryForm = () => {
  const [addCategory, { isLoading }] = useCreateLayoutMutation();
  const [newCategory, setNewCategory] = useState({
    title: "",
    image: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

    formData.append("folder", "categories");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      setPreview(res.data.secure_url);
      setNewCategory({ ...newCategory, image: res.data.secure_url });
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.image || !newCategory.title) {
      return toast.error("Please fill all the fields");
    }

    const payload = {
      type: "Category",
      title: newCategory.title,
      image: newCategory.image,
    };

    try {
      await addCategory(payload).unwrap();
      toast.success("Category Added successfully!");

      setNewCategory({
        title: "",
        image: "",
      });
      setPreview(null);
    } catch (error: any) {
      const message = error?.data.message ?? "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2 mb-3">
                  <Label htmlFor="title">Category Name </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter Category Title"
                    className="dark:placeholder:text-gray-400"
                    value={newCategory.title}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Category Image</Label>
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
                      className="hidden border border-slate-700 dark:border-slate-300"
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
                <div className="border border-dashed border-gray-600 dark:border-gray-700 rounded-lg p-4 h-[220px] flex items-center justify-center cursor-pointer">
                  {preview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview}
                        alt="Category preview"
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
                {isLoading ? "Saving..." : "Save Category"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default CategoryForm;
