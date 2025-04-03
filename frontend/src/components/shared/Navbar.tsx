"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, User, CrossIcon, MenuIcon, CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import Container from "./Container";
import { NavItem } from "@/constant";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header
      className={`sticky pt-4 left-0 w-full h-[70px] z-[80] border-b dark: border-[#ffffff1c] dark:shadow-xl  duration-500 top-0 transition-all duration-300 ${
        scrolled
          ? "   dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black backdrop-blur-md bg-white shadow-lg"
          : "bg-transparen border-b dark:border-[#ffffff1c]  shadow-xl"
      }`}
    >
      <div className=" ">
        <div
          onClick={() => setOpen(false)}
          className={`fixed duration-200 ${
            !open ? "invisible" : "visible"
          } w-screen h-screen backdrop-blur-sm cursor-pointer top-0 left-0 z-10`}
        ></div>
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              ELearning
            </Link>

            {/* Desktop Navigation Links */}
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

            {/* Theme Toggle & User - Right */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // ✅ Toggle theme
                className="text-gray-900 dark:text-white cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className=" size-6" />
                ) : (
                  <Moon className=" size-6" />
                )}
              </Button>

              {/* User Login/Signup Dialog */}

              <Link href={"/sign-in"}>
                <button className="text-[16px] cursor-pointer w-20 h-10 rounded-md bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
                  <span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  Login
                </button>
              </Link>

              {/* Mobile Menu Button */}

              <div
                className={`${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
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
              <Button
                onClick={toggleMenu}
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-900 dark:text-white"
              >
                <MenuIcon />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
