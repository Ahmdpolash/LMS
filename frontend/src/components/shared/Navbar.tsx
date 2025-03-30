"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, User, CrossIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import Container from "./Container";
import { NavItem } from "@/constant";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header
      className={`sticky pt-4 left-0 w-full h-[70px] z-[80] border-b dark: border-[#ffffff1c] dark:shadow-xl  duration-500 top-0 transition-all duration-300 ${
        scrolled
          ? "   dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black backdrop-blur-md "
          : "bg-transparent"
      }`}
    >
      <div className=" ">
        <Container>
          <div className="">
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
                  className="text-gray-900 dark:text-white"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>

                {/* User Login/Signup Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-900 dark:text-white"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-[#111827] text-white border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Account</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        Login or create a new account to access all features.
                      </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-[#1e293b]">
                        <TabsTrigger
                          value="login"
                          className="data-[state=active]:bg-[rgb(37,150,190)] data-[state=active]:text-white"
                        >
                          Login
                        </TabsTrigger>
                        <TabsTrigger
                          value="signup"
                          className="data-[state=active]:bg-[rgb(37,150,190)] data-[state=active]:text-white"
                        >
                          Sign Up
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="login" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-200"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="bg-[#1e293b] border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-200"
                          >
                            Password
                          </label>
                          <Input
                            id="password"
                            type="password"
                            className="bg-[#1e293b] border-gray-700 text-white"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <label className="text-sm text-gray-300 flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="rounded bg-[#1e293b] border-gray-700"
                            />
                            Remember me
                          </label>
                          <a
                            href="#"
                            className="text-sm text-[rgb(37,150,190)] hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                          Login
                        </Button>
                      </TabsContent>

                      <TabsContent value="signup" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-200"
                          >
                            Full Name
                          </label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="bg-[#1e293b] border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="signup-email"
                            className="text-sm font-medium text-gray-200"
                          >
                            Email
                          </label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            className="bg-[#1e293b] border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="signup-password"
                            className="text-sm font-medium text-gray-200"
                          >
                            Password
                          </label>
                          <Input
                            id="signup-password"
                            type="password"
                            className="bg-[#1e293b] border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="confirm-password"
                            className="text-sm font-medium text-gray-200"
                          >
                            Confirm Password
                          </label>
                          <Input
                            id="confirm-password"
                            type="password"
                            className="bg-[#1e293b] border-gray-700 text-white"
                          />
                        </div>
                        <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                          Create Account
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>

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
          </div>
        </Container>
      </div>
    </header>
  );
}

// bg-white/80
