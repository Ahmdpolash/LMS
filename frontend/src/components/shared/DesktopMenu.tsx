"use client";
import { NavItem } from "@/constant";
import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopMenu = () => {
  const pathname = usePathname();

  const { data } = useCurrentUserQuery({});
  const courseInfo = data?.data;

  const hasPurchasedCourses = courseInfo?.courses?.length > 0;

  // Filter NavItem to exclude "My Courses" if the user has no purchased courses
  const filteredNavItems = hasPurchasedCourses
    ? NavItem
    : NavItem.filter((item) => item.name !== "My Courses");

  return (
    <nav className="hidden lg:block">
      <ul className="lg:flex lg:flex-1 lg:gap-9 text-[18px] tracking-wide list-none">
        {filteredNavItems.map((item, idx) => (
          <li
            className="text-gray-900 dark:text-white *:hover:text-teal-400 *:hover:transition-transform *:hover:duration-500"
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
    </nav>
  );
};

export default DesktopMenu;
