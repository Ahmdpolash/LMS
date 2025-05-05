"use client";

import { SquarePen } from "lucide-react";
import { useState } from "react";
import UpdateMyProfileForm from "../../../_components/dashboard/UpdateMyProfileForm";
import MyProfile from "../../../_components/dashboard/MyProfile";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth) as {
    user: TUser | null;
  };
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className=" text-white p-4 bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg ">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-dashed border-gray-400 dark:border-gray-600 pb-4">
          <h1 className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
            {!open ? "My Profile" : "Update Profile Info"}
          </h1>
          <button
            onClick={toggleOpen}
            className="cursor-pointer text-black dark:text-white p-2 rounded-md hover:bg-purple-900/30 transition-colors"
          >
            <SquarePen className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Profile Modal */}

        {/* User Information Section */}

        {!open ? (
          <>
            {/* Device Activity Section */}
            <MyProfile user={user as TUser} />
            <div className="pt-4">
              <h1 className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
                Device Activity
              </h1>
              <div className="h-px bg-gray-400 dark:bg-gray-600/50 mt-4 mb-6" />

              {/* Device Activity Table */}
              <div className="overflow-x-auto">
                <table className="w-full overflow-x-auto">
                  <thead className="bg-gray-300 dark:bg-[#202a46] text-left rounded-lg ">
                    <tr>
                      <th className="py-4 px-4 font-medium">Serial</th>
                      <th className="py-4 px-4 font-medium">Platform</th>
                      <th className="py-4 px-4 font-medium">Date</th>
                      <th className="py-4 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-400 dark:border-gray-800 ">
                      <td className="py-4 px-4 ">1</td>
                      <td className="py-4 px-4 text-balance">Windows 10</td>
                      <td className="py-4 px-4 text-balance">
                        20-03-2025 10:24 AM
                      </td>
                      <td className="py-4 px-4">
                        <button className="cursor-pointer text-purple-400 hover:text-purple-300 transition-colors">
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <UpdateMyProfileForm user={user as TUser} setOpen={setOpen} />
        )}
      </div>
    </div>
  );
}
