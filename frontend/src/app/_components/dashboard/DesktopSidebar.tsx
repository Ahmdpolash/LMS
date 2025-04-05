"use client";

import {
  Book,
  LayoutDashboard,
  Lock,
  LogOutIcon,
  SquareUser,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopSidebar = () => {
  const pathname = usePathname();
  const role: string = "user";

  return (
    <div className="hidden bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-300 dark:border-slate-700 rounded-lg lg:block h-[65vh] z-40 w-[290px] ">
      <div className="">
        <ul className="py-2  text-black dark:text-white  space-y-2">
          {role === "admin" ? (
            <>
              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 ${
                  pathname === "/dashboard/my-profile"
                    ? "bg-gray-300/50 dark:bg-[#1e2a78]"
                    : ""
                }`}
              >
                <SquareUser className="w-5 h-5" />
                <Link href={"/dashboard/my-profile"} className="block">
                  My Profile
                </Link>
              </li>

              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 ${
                  pathname === "/dashboard/change-password"
                    ? "bg-gray-300/50 dark:bg-[#1e2a78]"
                    : ""
                }`}
              >
                <Lock className="w-5 h-5" />
                <Link href={"/dashboard/change-password"} className="block">
                  Change Password
                </Link>
              </li>
              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 `}
              >
                <LayoutDashboard className="w-5 h-5" />
                <Link href={"/admin"} className="block">
                  Admin Dashboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 ${
                  pathname === "/dashboard"
                    ? "bg-gray-300/50 dark:bg-[#1e2a78]"
                    : ""
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <Link href={"/dashboard"} className="block">
                  Dashboard
                </Link>
              </li>

              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 ${
                  pathname === "/dashboard/my-profile"
                    ? "bg-gray-300/50 dark:bg-[#1e2a78]"
                    : ""
                }`}
              >
                <SquareUser className="w-5 h-5" />
                <Link href={"/dashboard/my-profile"} className="block">
                  My Profile
                </Link>
              </li>

              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 ${
                  pathname === "/dashboard/my-course"
                    ? "bg-gray-300/50 dark:bg-[#1e2a78]"
                    : ""
                }`}
              >
                <Book className="w-5 h-5" />
                <Link href={"/dashboard/my-course"} className="block">
                  Enrolled Course
                </Link>
              </li>

              <li
                className={` cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300 ${
                  pathname === "/dashboard/change-password"
                    ? "bg-gray-300/50 dark:bg-[#1e2a78]"
                    : ""
                }`}
              >
                <Lock className="w-5 h-5" />
                <Link href={"/dashboard/change-password"} className="block">
                  Change Password
                </Link>
              </li>
            </>
          )}

          <li className=" cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300">
            <LogOutIcon className="w-5 h-5" />
            <span className="block">Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopSidebar;
