"use client";

import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";
import Image from "next/image";
import Link from "next/link";
import { useGetAllLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CategorySection() {
  const { data: categoriesData } = useGetAllLayoutByTypeQuery("Category", {});
  const categories = categoriesData?.data?.categories;

  return (
    <div className="border-b border-gray-400 dark:border-gray-700">
      <Container>
        <section className="py-16">
          <div className="text-center mb-12">
            <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1.5 text-sm mb-4">
              Explore Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
                Browse Top Categories
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover courses in various fields to enhance your skills and advance your career
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {categories?.map((category: any, idx: number) => (
              <motion.div key={idx} variants={cardVariants}>
                <Link
                  href={{
                    pathname: "/courses",
                    query: { Category: category?.title.replace(/\s+/g, " ") },
                  }}
                >
                  <div className="group bg-gray-100 dark:bg-[#1a2342] h-[160px] rounded-xl p-5 text-center border border-gray-200 dark:border-gray-800 hover:border-[rgb(37,150,190)]/50 dark:hover:border-[rgb(37,150,190)]/40 hover:shadow-lg hover:shadow-[rgb(37,150,190)]/10 transition-all duration-300 cursor-pointer">
                    <div className="p-3 bg-[#1E3569] group-hover:bg-[rgb(37,150,190)]/20 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center transition-colors duration-300 ring-2 ring-transparent group-hover:ring-[rgb(37,150,190)]/30">
                      <Image
                        src={category?.image}
                        height={100}
                        width={100}
                        alt={category?.title}
                        className="w-[38px] group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-[rgb(37,150,190)] transition-colors duration-300">
                      {category?.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Container>
    </div>
  );
}
