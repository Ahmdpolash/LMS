"use client";
import { useCurrentUserQuery } from "@/redux/api/baseApi";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/types";
import { CreditCard, Mail, Smartphone, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";
const UpdateMyProfileForm = ({ user }: { user: TUser }) => {
  const [udpateAvatar, { isSuccess, error, isLoading }] =
    useUpdateAvatarMutation();
  const [currentUser, setCurrentUser] = useState(false);
  const {} = useCurrentUserQuery(undefined, {
    skip: currentUser ? false : true,
  });
  const [formData, setFormData] = useState({
    name: user && user?.name,
    userId: (user && user?.userId) || "N/A",
    email: user && user?.email,
    number: (user && user?.number) || "N/A",
  });

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        udpateAvatar(avatar);
      }
    };

    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser(true);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  const handleSubmit = (e: any) => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className=" cursor-pointer group mx-auto text-center">
        <div className="relative">
          {isLoading ? (
            <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8]" />
          ) : (
            <Image
              src={user?.avatar ? user?.avatar.url : "avatar.jpeg"}
              alt="Profile"
              width={128}
              height={128}
              className="w-28 h-28 object-cover rounded-full overflow-hidden border-3 border-[#37a39a] cursor-pointer"
            />
          )}

          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={imageHandler}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
          />

          {!isLoading ? (
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] rounded-full absolute bottom-3 right-1 flex items-center justify-center cursor-pointer ">
                <AiOutlineCamera size={24} className="z-1" />
              </div>
            </label>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="mt-4">
        <form>
          <div className="flex flex-col lg:flex-row gap-4 space-y-3 lg:space-y-6">
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">Full Name</p>
              </div>
              <input
                type="text"
                name="name"
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white "
                value={formData?.name}
              />
            </div>

            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">Email</p>
              </div>
              <input
                type="email"
                name="email"
                readOnly
                disabled
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white placeholder:text-slate-800 placeholder:dark:text-gray-400 cursor-no-drop"
                value={formData?.email}
              />
            </div>
          </div>

          <div className="flex  flex-col lg:flex-row gap-4">
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">Student ID </p>
              </div>
              <input
                type="text"
                name="userId"
                value={formData?.userId}
                disabled
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white cursor-no-drop"
              />
            </div>

            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 text-gray-400">
                <Smartphone className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">
                  Mobile Number
                </p>
              </div>
              <input
                type="text"
                name="number"
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white"
                value={formData?.number}
              />
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full lg:w-[250px]  bg-transparent  border border-black dark:border-white  mt-5  hover:bg-gray-800 transition-colors rounded p-3 text-black dark:text-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMyProfileForm;

/*  {isLoading ? (
              <div className="flex justify-center items-center mx-auto w-6 h-6 border-4 border-t-4 border-transparent border-t-gray-500 rounded-full animate-spin"></div>
            ) : (
              "Update"
            )} */
