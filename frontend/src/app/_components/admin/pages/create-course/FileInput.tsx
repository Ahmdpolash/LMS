import React, { useState, useEffect } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const FileInput = ({ value, onChange }: any) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleImageUpload = () => {
    document.getElementById("image_input")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file); // Register with react-hook-form
    }
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
      ></input>
      {!preview ? (
        <div className="w-full md:w-[90%] cursor-pointer flex dark:border-slate-700 dark:bg-slate-900 items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6 ">
          <IoMdCloudUpload className="text-[3rem] text-primary" />
          <p className="mt-2 text-text dark:text-[#abc2d3]">
            Drop here the Thumbnail file
          </p>
          <p className=" text-text dark:text-[#abc2d3]">or</p>
          <button
            className="px-6 py-1.5 text-[#3B9DF8] cursor-pointer"
            onClick={handleImageUpload}
          >
            Browse
          </button>
        </div>
      ) : (
        <div className="relative w-full md:w-[80%] h-[200px] border-2 border-teal-500 border-dashed  p-2">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
          <MdDelete
            className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
            onClick={() => onChange(null)}
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
