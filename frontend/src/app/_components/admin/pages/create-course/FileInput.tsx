import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Image from "next/image";

interface FileInputProps {
  value: { public_id: string; url: string } | null;
  onChange: (fileObj: { public_id: string; url: string } | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ value, onChange }) => {
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
    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center cursor-pointer">
      <input
        type="file"
        name="image"
        id="image_input"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {loading ? (
        <div className="w-full md:w-[90%] flex items-center justify-center py-12">
          <div className="animate-spin w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
      ) : !preview ? (
        <div className="w-full md:w-[90%] cursor-pointer flex dark:border-slate-700 dark:bg-slate-800/70 items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6">
          <IoMdCloudUpload className="text-[3rem] text-primary" />
          <p className="mt-2 text-text dark:text-[#abc2d3]">
            Drop here the Thumbnail file
          </p>
          <p className="text-text dark:text-[#abc2d3]">or</p>
          <button
            type="button"
            className="px-6 py-1.5 text-[#3B9DF8] cursor-pointer"
            onClick={() => document.getElementById("image_input")?.click()}
          >
            Browse
          </button>
        </div>
      ) : (
        // image preview
        <div className="relative w-full h-[220px]">
          <Image
            src={preview}
            height={200}
            width={200}
            alt="preview"
            className="w-full h-full object-cover rounded-md"
          />
          <MdDelete
            className="absolute top-2 right-2 text-red-500 h-8 w-8 bg-white p-1 rounded-full text-xl cursor-pointer"
            onClick={handleRemove}
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
