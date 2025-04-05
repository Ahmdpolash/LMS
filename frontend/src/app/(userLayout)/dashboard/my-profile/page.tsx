"use client";

import { CreditCard, Mail, Smartphone, SquarePen, User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className=" text-white p-4 bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-400 dark:border-slate-700 rounded-lg">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-dashed border-gray-400 dark:border-gray-600 pb-4">
          <h1 className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
            My Profile
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-slate-800 dark:text-gray-400 text-sm">
                Full Name
              </p>
              <p className="text-slate-800 dark:text-white text-lg">
                Polash Ahmed
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-slate-800 dark:text-gray-400 text-sm">Email</p>
              <p className="text-slate-800 dark:text-white text-lg">
                ahmedpolash732@gmail.com
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-slate-800 dark:text-gray-400 text-sm">
                Student ID
              </p>
              <p className="text-slate-800 dark:text-white text-lg">
                WEB8-1292
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-slate-800 dark:text-gray-400 text-sm">
                Mobile Number
              </p>
              <p className="text-slate-800 dark:text-white text-lg">
                +8801756213028
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">Full Name</p>
              </div>
              <input
                type="text"
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white "

              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">Email</p>
              </div>
              <input
                type="email"
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white placeholder:text-slate-800 placeholder:dark:text-gray-400"

              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">Student ID </p>
              </div>
              <input
                type="text"
                placeholder="N/A"
                disabled
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white cursor-no-drop"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Smartphone className="w-5 h-5" />
                <p className="text-black dark:text-white text-s">
                  Mobile Number
                </p>
              </div>
              <input
                type="text"
                className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white "

              />
            </div>
          </div>
        )}

        {/* Device Activity Section */}
        <div className="pt-4">
          <h1 className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
            Device Activity
          </h1>
          <div className="h-px bg-gray-400 dark:bg-gray-600/50 mt-4 mb-6" />

          {/* Device Activity Table */}
          <div className="overflow-auto">
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
      </div>
    </div>
  );
}
