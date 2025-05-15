"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";

type Props = {
  label: string;
  onUpload: (videoUrl: string) => void;
};

export const VideoUploader = ({ label, onUpload }: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);
    setUploadedUrl("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "course_upload_preset");
    formData.append("resource_type", "video");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / (e.total || 1));
            setUploadProgress(percent);
          },
        }
      );

      const data = res.data;
      if (data.secure_url) {
        toast.success("Video uploaded successfully!");
        setUploadedUrl(data.secure_url);
        onUpload(data.secure_url);
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="videoUpload" className="flex items-center justify-between">
        {label}{" "}
        {uploadedUrl && (
          <div className="mt-2">
            <p className="text-sm text-green-600">
              Uploaded URL:{" "}
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700"
              >
                View Video
              </a>
            </p>
          </div>
        )}
      </label>
      {loading ? (
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          />
          <p className="text-sm text-blue-600 mt-1">{uploadProgress}%</p>
        </div>
      ) : (
        <>
          <Input
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="placeholder:text-slate-500 border-slate-600 mb-1 cursor-pointer"
          />
        </>
      )}
    </div>
  );
};
