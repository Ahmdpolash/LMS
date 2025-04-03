"use client";
import { NavItem } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block">
      <ul className="lg:flex lg:flex-1 lg:gap-9 text-[18px] tracking-wide list-none">
        {NavItem.map((item, idx) => (
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
