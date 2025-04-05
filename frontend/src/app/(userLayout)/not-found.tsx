"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Home } from "lucide-react";
import "../globals.css";
import Footer from "@/components/home/Footer";
export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-poppins">
      <div className="bg-white dark:bg-[#0C111B] min-h-screen transition-colors duration-200">
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center justify-center text-center">
            {/* 404 Graphic */}
            <div className="relative mb-8">
              <div className="text-9xl font-bold text-gray-200 dark:text-gray-800">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
                  404
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-[rgb(37,150,190)]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>

            <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track to your learning journey.
            </p>

            {/* Search box */}
            <div className="max-w-md w-full mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white dark:bg-[#1a2342] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[rgb(37,150,190)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              >
                <Link href="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Courses
                </Link>
              </Button>
            </div>

            {/* Popular links */}
            <div className="mt-12">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Popular Pages
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/courses"
                  className="px-4 py-2 bg-gray-100 dark:bg-[#1a2342] rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#243050] transition-colors"
                >
                  Courses
                </Link>
                <Link
                  href="/about-us"
                  className="px-4 py-2 bg-gray-100 dark:bg-[#1a2342] rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#243050] transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/faq"
                  className="px-4 py-2 bg-gray-100 dark:bg-[#1a2342] rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#243050] transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/policy"
                  className="px-4 py-2 bg-gray-100 dark:bg-[#1a2342] rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#243050] transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
