"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import { Button } from "../ui/button";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { TUser } from "@/types";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

import { usePathname, useRouter } from "next/navigation";
import { persistor } from "@/redux/store";
import { signOut, useSession } from "next-auth/react";

const ThemeTogglerAndUserBtn = ({ setTheme, theme, toggleMenu, open }: any) => {
  const pathname = usePathname();
  const { user: customUser } = useAppSelector((state) => state.auth) as {
    user: any | null;
  };
  const { data: session } = useSession();
  const user = customUser || session?.user || null;

  const router = useRouter();
  const [logOut] = useLogoutMutation();

  // make a normal funcion

  // const handleLogOut = async () => {
  //   if (session) {
  //     // signOut({ callbackUrl: "/" });
  //     // router.push("/");
  //     await signOut();
  //     router.push("/");
  //   } else {
  //     await logOut({});
  //     await persistor.purge();
  //     router.push("/");
  //     toast.success("Logged out successfully");
  //   }
  // };

  const handleLogOut = async () => {
    await logOut({}); // Your backend logout
    await persistor.purge(); // Clear Redux persisted store
    await signOut({ redirect: false }); // Sign out from NextAuth
    router.push("/"); // Redirect after logout
    toast.success("Logged out successfully");
  };

  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropDownRef = useRef(null);

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

  return (
    <div className="flex items-center space-x-4">
      <button
        className="cursor-pointer pr-0 lg:pr-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-[24px] w-[24px]" key="sun" />
        ) : (
          <Moon className="h-[24px] w-[24px]" key="moon" />
        )}
      </button>

      {/* login button */}
      {!user ? (
        <Link href={"/sign-in"}>
          <button className="text-[16px] cursor-pointer w-16 lg:w-20 h-8 lg:h-10 rounded-md bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
            <span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Login
          </button>
        </Link>
      ) : (
        <>
          <div ref={dropDownRef} className="relative mx-auto w-fit text-black">
            <button onClick={() => setOpenDropdown((prev) => !prev)}>
              <Image
                width={40}
                height={40}
                className={`cursor-pointer size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80  ${
                  pathname === "/dashboard/my-profile" ||
                  pathname === "/dashboard/my-course" ||
                  pathname === "/dashboard/change-password"
                    ? "border-3 border-[#37a39a]"
                    : ""
                }`}
                src={
                  customUser
                    ? customUser.avatar?.url || "/avatar.jpeg"
                    : session?.user?.image || "/avatar.jpeg"
                }
                alt="user-profile-image"
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
                <Image
                  width={60}
                  height={60}
                  className="cursor-pointer size-16 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
                  src={
                    customUser
                      ? customUser.avatar?.url || "/avatar.jpeg"
                      : session?.user?.image || "/avatar.jpeg"
                  }
                  alt="user-profile"
                />

                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  {customUser?.name || session?.user?.name}
                </p>
                {user?.role !== "admin" && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Student ID: {user?.userId}
                  </p>
                )}
                <Link href={"/dashboard/my-profile"}>
                  <button className="cursor-pointer mt-3 px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:opacity-90 transition">
                    View Profile
                  </button>
                </Link>
              </div>
              <div className="flex flex-col py-2">
                {user?.role === "admin" ? (
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

                <Button
                  onClick={handleLogOut}
                  className="cursor-pointer text-white  dark:bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  Log Out
                </Button>
              </div>
            </ul>
          </div>
        </>
      )}

      {/* Mobile Menu Button */}

      <MobileMenu open={open} />

      <button
        onClick={toggleMenu}
        className=" lg:hidden size-9 cursor-pointer text-gray-900 dark:text-white"
      >
        <MenuIcon />
      </button>
    </div>
  );
};

export default ThemeTogglerAndUserBtn;
