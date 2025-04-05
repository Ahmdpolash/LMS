"use client";
import React, { ReactNode, useState } from "react";

import {
  Cross,
  Home,
  LayoutDashboard,
  LayoutDashboardIcon,
  List,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import sidebarRoutes from "@/constant/sidebar-routes";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
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
          className="ml-5 px-3 mt-2 text-white rounded-md bg-indigo-500 inline-block lg:hidden py-2 "
        >
          <List className="text-xl mt-" />
        </div>

        {/* mobile sidebar */}

        <div
          className={`${
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } lg:hidden transition-all duration-500 fixed  z-[99999] border border-gray-200 shadow-lg backdrop-blur-sm transform h-full sm-device w-[320px] md:w-[390px] bg-white text-black top-0  left-0`}
        >
          <div className="logo border-b py-1 border-slate-300">
            {/* <Link href="/">
              <Image
                className="w-[160px] md:w-[180px] mx-auto "
                src={logo}
                alt=""
              />
            </Link> */}
            logo
          </div>
          <ul className="py-2 text-slate-600 px-4">
            <li className="flex justify-start items-center gap-2 py-2">
              <span className="text-xl">
                <LayoutDashboard />
              </span>
              <Link href="/dashboard/my-dashboard" className="block">
                Dashboard
              </Link>
            </li>

            <li className="flex justify-start items-center gap-2 py-2">
              <span className="text-2xl">
                <Home />
              </span>
              <Link href="/dashboard/notifications" className="block">
                Notification
              </Link>
            </li>
          </ul>
          {/* close btn */}
          <button
            className="h-[27px] w-[27px] text-[#FE2424] py-1  text-[16px]  shadow-md border border-red-500 rounded-full font-semibold flex absolute top-0 right-2 mt-2"
            onClick={() => setOpen(false)}
          >
            <Cross className="ml-[5px] mt-[1.2px]" />
          </button>
          {/* close btn */}
        </div>

        {/* desktop sidebar */}

        <Container>
          <div className="flex gap-5 lg:my-20 py-4">
            <div className="hidden bg-gray-300/50 dark:bg-[#151d33] shadow-md dark:shadow-xl border border-slate-300 dark:border-slate-700 rounded-lg lg:block h-[52vh] z-40 w-[270px] ">
              <div className="">
                <ul className="py-2 text-black dark:text-white  space-y-2">
                  {sidebarRoutes.user.map((route, idx) => (
                    <li
                      key={idx}
                      className=" cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300"
                    >
                      <route.icon className="w-5 h-5" />
                      <Link href={route.path} className="block">
                        {route.title}
                      </Link>
                    </li>
                  ))}

                  <li className=" cursor-pointer flex justify-start items-center gap-2 py-2 px-4 hover:dark:bg-[#1e2a78] hover:bg-gray-200 rounded-r-sm transition-all duration-300">
                    <LogOutIcon className="w-5 h-5" />
                    <span className="block">Log Out</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1">{children}</div>
          </div>
        </Container>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;
