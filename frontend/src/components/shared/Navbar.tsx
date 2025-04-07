"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Container from "./Container";
import DesktopMenu from "./DesktopMenu";
import ThemeTogglerAndUserBtn from "./ThemeTogglerAndUserBtn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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
          ? "   dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black backdrop-blur-md shadow-lg"
          : "bg-transparent border-b dark:border-[#ffffff1c]  shadow-xl"
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
            <DesktopMenu />

            {/* Theme Toggle & User - Right */}
            <ThemeTogglerAndUserBtn
              setTheme={setTheme}
              theme={theme}
              toggleMenu={toggleMenu}
              open={open}
             
            />
          </div>
        </Container>
      </div>
    </header>
  );
}
