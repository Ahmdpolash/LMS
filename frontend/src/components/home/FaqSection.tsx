"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { faqItems } from "@/constant/faqData";

export default function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-[#0C111B] dark:to-[#131c36]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
            Have Questions?
          </Badge>
          <h2 className=" md:text-4xl font-bold trawi text-gray-900 dark:text-white mb-4  text-[25px]  font-poppins text-center py-2 lg:text-[40px]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our platform, courses, and
            learning experience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search questions..."
            className="pl-10 bg-white dark:bg-[#1a2342] border-teal-200 dark:border-white rounded-lg "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Items */}
        <div className="max-w-5xl mx-auto cursor-pointer">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => (
              <div
                key={item.id}
                className=" mb-4 bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openItem === item.id}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 dark:bg-[#0C111B] p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-medium cursor-pointer text-gray-900 dark:text-white">
                        {item.question}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-3 text-xs border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                      >
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-0 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <HelpCircle className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Can't find what you're looking for?{" "}
            <a
              href="/contact"
              className="text-[rgb(37,150,190)] hover:underline font-medium"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
