import axios from "axios";

export const handleImageUpload = async (file: File) => {

    

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
    const uploadedImageUrl = res.data.secure_url;
    setImageUrl(uploadedImageUrl);
    setValue("thumbnail", uploadedImageUrl);
  } catch (error) {
    console.error("Image upload failed", error);
  }
};
