"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../shared/Container";
import { motion } from "framer-motion";
import { useGetAllLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import { LayoutGrid } from "lucide-react";

export default function CategorySection() {
  const { data: categoriesData, isLoading } = useGetAllLayoutByTypeQuery(
    "Category",
    {}
  );
  const categories = categoriesData?.data?.categories || [];

  // No card is hovered by default; only highlights on user hover
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-[#090d16] dark:via-[#0c1220] dark:to-[#090d16] overflow-hidden border-b border-gray-200 dark:border-gray-800">
      {/* Decorative ambient background glows matching LMS brand */}
      <div
        className="absolute top-12 left-0 w-96 h-96 bg-[rgb(37,150,190)]/10 dark:bg-[rgb(37,150,190)]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3"
        aria-hidden="true"
      />

      <Container>
        <div className="relative">
          {/* Decorative Dot Matrix in top right corner */}
          <div
            className="hidden md:grid grid-cols-6 gap-2.5 absolute top-0 right-2 lg:right-6 pointer-events-none opacity-80"
            aria-hidden="true"
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-400/80 dark:bg-amber-400/70"
              />
            ))}
          </div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-[rgb(37,150,190)]/30 bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)] text-xs sm:text-sm font-medium tracking-wide mb-5 shadow-xs"
            >
              Categories
            </motion.div>

            {/* Main Heading with highlighter brush effect */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight md:leading-snug"
            >
              Explore Top Courses{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">Categories</span>
                {/* Organic brush underline stroke */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 sm:h-3.5 text-amber-400 dark:text-amber-400 z-0 pointer-events-none"
                  viewBox="0 0 200 18"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13C45 4 125 3 197 10C140 14 65 17 3 13Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <br />
              That Change Yourself
            </motion.h2>
          </div>

          {/* Divided Category Grid Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/50 overflow-hidden bg-slate-200 dark:bg-slate-700/80"
            onMouseLeave={() => setActiveId(null)}
          >
            {/* Loading Skeleton */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-px">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#0c1322] py-12 px-6 flex flex-col items-center justify-center animate-pulse"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 mb-4" />
                    <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="bg-white dark:bg-[#0c1322] py-16 text-center text-gray-500 dark:text-gray-400">
                No categories available.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-px">
                {categories.map((category: any, index: number) => {
                  const isActive = activeId === index;

                  return (
                    <Link
                      key={category?._id || index}
                      href={{
                        pathname: "/courses",
                        query: {
                          Category: category?.title?.replace(/\s+/g, " "),
                        },
                      }}
                      onMouseEnter={() => setActiveId(index)}
                      className={`group relative flex flex-col items-center justify-center text-center py-10 md:py-12 px-6 cursor-pointer transition-all duration-300 ease-out select-none ${
                        isActive
                          ? "bg-gradient-to-br from-[rgb(37,150,190)] to-[#1a7698] text-white shadow-lg shadow-[rgb(37,150,190)]/20"
                          : "bg-white dark:bg-[#0c1322] hover:bg-slate-50/70 dark:hover:bg-[#111a2e] text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {/* Icon container */}
                      <div className="w-14 h-14 relative flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                        {category?.image ? (
                          <Image
                            src={category.image}
                            alt={category.title || "Category"}
                            width={56}
                            height={56}
                            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
                          />
                        ) : (
                          <LayoutGrid
                            className={`w-10 h-10 transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-[rgb(37,150,190)]"
                            }`}
                          />
                        )}
                      </div>

                      {/* Category Title */}
                      <h3
                        className={`text-base md:text-lg font-semibold tracking-normal transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-800 dark:text-gray-100 group-hover:text-[rgb(37,150,190)]"
                        }`}
                      >
                        {category?.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
