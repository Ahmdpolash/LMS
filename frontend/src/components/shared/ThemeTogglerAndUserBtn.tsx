"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import { Button } from "../ui/button";
import { MenuIcon, Moon, Sun } from "lucide-react";

const ThemeTogglerAndUserBtn = ({
  setTheme,
  theme,
  toggleMenu,
  open,
  user,
}: any) => {
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropDownRef = useRef(null);

  const it = [
    {
      name: "My Course ",
      path: "/dashboard/my-course ",
    },
    {
      name: "Dashboard",
      path: "/dashboard ",
    },
  ];

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !(dropDownRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const role: string = "user";

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // ✅ Toggle theme
        className="text-gray-900  dark:text-white cursor-pointer"
      >
        {theme === "dark" ? <Sun key="sun" /> : <Moon key="moon" />}
      </Button>

      {/* login button */}
      {!user ? (
        <Link href={"/sign-in"}>
          <button className="text-[16px] cursor-pointer w-20 h-10 rounded-md bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
            <span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Login
          </button>
        </Link>
      ) : (
        <>
          <div ref={dropDownRef} className="relative mx-auto w-fit text-black">
            <button onClick={() => setOpenDropdown((prev) => !prev)}>
              <img
                width={40}
                height={40}
                className="cursor-pointer size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s"
                alt="avatar drop down navigate ui"
              />
            </button>
            <ul
              className={`${
                openDropdown
                  ? "visible duration-300 opacity-100"
                  : "invisible opacity-0"
              } absolute right-0 top-12 z-50 w-64 rounded-xl bg-white dark:bg-[#1f2937] shadow-lg transition-all`}
            >
              <div className="flex flex-col items-center p-4 border-b dark:border-gray-700">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s"
                  alt="User avatar"
                  className="size-16 rounded-full object-cover"
                />
                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Polash Ahmed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Student ID: WEB8-1292
                </p>
                <Link href={"/dashboard/my-profile"}>
                  <button className="cursor-pointer mt-3 px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:opacity-90 transition">
                    View Profile
                  </button>
                </Link>
              </div>
              <div className="flex flex-col py-2">
                {role === "admin" ? (
                  <>
                    <Link
                      className={`w-ful text-black dark:text-white cursor-pointer text-left px-5 py-3 text-sm hover:dark:bg-[#121A31] duration-500 transition `}
                      href={"/admin"}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      className={`w-ful text-black dark:text-white cursor-pointer text-left px-5 py-3 text-sm hover:dark:bg-[#121A31] duration-500 transition `}
                      href={"/dashboard/my-profile"}
                    >
                      My Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className={`w-ful text-black dark:text-white cursor-pointer text-left px-5 py-3 text-sm hover:dark:bg-[#121A31] duration-500 transition `}
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                    <Link
                      className={`w-ful text-black dark:text-white cursor-pointer text-left px-5 py-3 text-sm hover:dark:bg-[#121A31] duration-500 transition `}
                      href={"/dashboard/my-course"}
                    >
                      My Course
                    </Link>
                  </>
                )}

                <Button className="cursor-pointer text-white  dark:bg-gradient-to-r from-purple-500 to-blue-500">
                  Log Out
                </Button>
              </div>
            </ul>
          </div>
        </>
      )}

      {/* Mobile Menu Button */}

      <MobileMenu open={open} />

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className=" lg:hidden text-gray-900 dark:text-white"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default ThemeTogglerAndUserBtn;
