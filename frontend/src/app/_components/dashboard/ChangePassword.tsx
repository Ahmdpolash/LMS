"use client";

import {
  useChangePasswordMutation,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { persistor } from "@/redux/store";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [ChangePassword, { isSuccess, isLoading }] =
    useChangePasswordMutation();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const [logOut] = useLogoutMutation();

  // toast
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully !! Please re-login");
      logOut({});
      persistor.purge();
      router.push("/sign-in");
    }
  }, [isSuccess]);

  // input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // onsubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      setError(""); // clear error
      await ChangePassword({ oldPassword, newPassword }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
    console.log(passwordData);
  };

  return (
    <div className="bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg px-4 lg:px-0 py-5 lg:py-9 ">
      <div className="w-full max-w-md space-y-8 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium text-center dark:text-white text-slate-800">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="oldPassword"
              className="text-[16px] text-black dark:text-gray-300 flex items-center gap-2"
            >
              <LockKeyhole size={18} />
              Enter your old password
            </label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={passwordData.oldPassword}
              onChange={handleChange}
              className="w-full   bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="newPassword"
              className="text-[16px] text-black dark:text-gray-300 flex items-center gap-2"
            >
              <LockKeyhole size={18} />
              Enter your New password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handleChange}
              className="w-full   bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-[16px] text-black dark:text-gray-300 flex items-center gap-2"
            >
              <LockKeyhole size={18} />
              Enter your Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              className="w-full   bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="cursor-pointer w-full bg-transparent  border border-teal-800 hover:bg-gray-800 transition-colors rounded p-3 text-white"
          >
            {isLoading ? (
              <div className="flex justify-center items-center mx-auto w-6 h-6 border-4 border-t-4 border-transparent border-t-gray-500 rounded-full animate-spin"></div>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
