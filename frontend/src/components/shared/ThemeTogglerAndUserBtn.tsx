'use client'
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import { Button } from "../ui/button";
import { MenuIcon, Moon, Sun } from "lucide-react";


const ThemeTogglerAndUserBtn = ({ setTheme, theme, toggleMenu, open }: any) => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // ✅ Toggle theme
        className="text-gray-900  dark:text-white cursor-pointer"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>

      {/* login button */}
      <Link href={"/sign-in"}>
        <button className="text-[16px] cursor-pointer w-20 h-10 rounded-md bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
          <span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
          <span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
          Login
        </button>
      </Link>

      {/* Mobile Menu Button */}

      <MobileMenu open={open} />

      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        className="block lg:hidden text-gray-900 dark:text-white"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default ThemeTogglerAndUserBtn;
