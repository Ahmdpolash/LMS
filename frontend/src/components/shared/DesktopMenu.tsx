"use client";

import { NavItem } from "@/constant";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const DesktopMenu = () => {
  const pathname = usePathname();
  const { user } = useAppSelector((state: any) => state.auth);

  const navItems = [...NavItem];
  if (user && user?.role === "admin") {
    navItems.push({ name: "Admin Dashboard", path: "/admin" });
  } else if (user && user?.role !== "admin") {
    navItems.push({ name: "My Classes", path: "/dashboard/my-course" });
  }

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-8 text-[15px] font-medium tracking-wide list-none">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <li key={idx} className="relative">
              <Link
                href={item.path}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[rgb(37,150,190)]"
                    : "text-gray-700 dark:text-gray-300 hover:text-[rgb(37,150,190)] dark:hover:text-[rgb(37,150,190)]"
                }`}
              >
                {item.name}
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[rgb(37,150,190)] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
