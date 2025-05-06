import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FileInputProps {
  value: { public_id: string; url: string } | null;
  onChange: (fileObj: { public_id: string; url: string } | null) => void;
}

const BannerFileInput: React.FC<FileInputProps> = ({ value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(value?.url ?? null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "default_preset"
    );
    formData.append("folder", "courses");

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
      onChange(fileObj);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className=" flex items-center flex-col gap-5 justify-center cursor-pointer">
      <div className="space-y-4">
        <Label>Preview</Label>
        <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 h-[300px] flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview || "/placeholder.svg"}
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
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => document.getElementById("banner-image")?.click()}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
        <input
          name="image"
          id="banner-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default BannerFileInput;
