"use client";
import { NavItem } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileMenu = ({ open }: any) => {
  const pathname = usePathname();

  return (
    <div>
      <div
        className={`${
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } lg:hidden transition-all fixed z-50 duration-500 border-r border-teal-600 shadow-lg backdrop-blur-sm transform h-screen w-[300px] bg-white text-black top-0 left-0  dark:bg-[#0F1729]`}
      >
        <ul className="flex flex-col text-white justify-start pt-4 items-start h-full gap-y-6  text-[21px] tracking-wide list-none">
          <h1 className=" border-b pb-4 border-teal-700 w-full text-center font-semibold">
            E-Learning
          </h1>
          {NavItem.map((item, idx) => (
            <li
              className="text-gray-900 pl-6 dark:text-white *:hover:text-teal-400 *:hover:transition-transform *:hover:duration-500"
              key={idx}
            >
              <Link
                href={item.path}
                className={`hover:duration-700 ${
                  pathname === item.path ? "text-teal-500" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-white">Copyright © 2023 ELearning</p>
      </div>
    </div>
  );
};

export default MobileMenu;
