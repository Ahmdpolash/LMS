"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Container from "./Container";
import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import ThemeTogglerAndUserBtn from "./ThemeTogglerAndUserBtn";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { useSession } from "next-auth/react";
import { useSocialLoginMutation } from "@/redux/features/auth/authApi";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setOpen(!open);

  // Social login
  const { user } = useAppSelector((state) => state.auth) as { user: TUser | null };
  const [socialAuth, { isLoading: isSocialAuthLoading }] = useSocialLoginMutation();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && !user && status === "authenticated" && !isSocialAuthLoading) {
      socialAuth({
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
      });
    }
  }, [session, socialAuth, user, status, isSocialAuthLoading]);

  return (
    <header
      className={`sticky left-0 w-full h-[70px] z-[80] top-0 transition-all duration-300 border-b ${
        scrolled
          ? "border-gray-200/50 dark:border-[#ffffff1c] backdrop-blur-md bg-white/80 dark:bg-[#0C111B]/80 shadow-sm dark:shadow-lg"
          : "bg-transparent border-gray-200 dark:border-[#ffffff1c]"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(37,150,190)] origin-left z-10"
        style={{ scaleX }}
      />

      {/* Mobile menu overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed duration-200 ${
          !open ? "invisible opacity-0" : "visible opacity-100"
        } w-screen h-screen backdrop-blur-sm cursor-pointer top-0 left-0 z-10 transition-opacity`}
      />

      <Container>
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <DesktopMenu />

          {/* Right Side */}
          <ThemeTogglerAndUserBtn
            setTheme={setTheme}
            theme={theme}
            toggleMenu={toggleMenu}
            open={open}
          />
        </div>
      </Container>
    </header>
  );
}
