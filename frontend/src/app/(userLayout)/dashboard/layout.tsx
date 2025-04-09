"use client";

import React, { ReactNode, useState } from "react";

import {
  Book,
  LayoutDashboard,
  List,
  Lock,
  LogOutIcon,
  SquareUser,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import sidebarRoutes from "@/constant/sidebar-routes";
import { usePathname } from "next/navigation";
import DesktopSidebar from "@/app/_components/dashboard/DesktopSidebar";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import ProtectedRoute from "@/hooks/userProtected";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth) as {
    user: TUser | null;
  };
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  return (
    <div className="">
      {/* blur screen */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed duration-200 ${
          !open ? "invisible" : "visible"
        } w-screen h-screen backdrop-blur-sm top-0 left-0 z-10`}
      ></div>

      <div className="  ">
        <div
          onClick={() => setOpen(!open)}
          className="ml-5 px-3 mt-2 text-white rounded-md bg-indigo-500 inline-block lg:hidden py-2 cursor-pointer "
        >
          <List className="text-xl mt-" />
        </div>

        {/* mobile sidebar */}

        <div
          className={`${
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } lg:hidden transition-all duration-500 fixed  z-[99999] border-r border-gray-600 shadow-lg backdrop-blur-sm transform h-full sm-device w-[320px] md:w-[390px] bg-white text-black top-0  left-0 dark:bg-[#0F1729]`}
        >
          <div className="logo border-b py-4 border-slate-300 text-black dark:text-white pl-3 text-lg">
            Elearning
          </div>
          <ul className="py-2 text-black dark:text-white  space-y-2">
            {user?.role === "admin" ? (
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

        {/* desktop sidebar */}

        <Container>
          <div className="flex gap-4 lg:gap-7 lg:my-20 py-4">
            <DesktopSidebar user={user as TUser} />

            <div className="flex-1/2 overflow-x-auto">
              <ProtectedRoute>{children}</ProtectedRoute>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;
