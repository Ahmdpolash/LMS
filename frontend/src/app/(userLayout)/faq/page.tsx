"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Award,
  Clock,
  Users,
  ArrowRight,
  PlusIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { faqItems } from "@/constant/faqData";
import Container from "@/components/shared/Container";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = faqItems.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get unique categories
  const categories = ["all", ...new Set(faqItems.map((item) => item.category))];


  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="min-h-screen font-poppins">
      <div className="bg-white dark:bg-[#0C111B] min-h-screen transition-colors duration-200">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#151f38] to-[#1a2342] py-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                Help Center
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Find answers to common questions about our platform, courses,
                and learning experience
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-12 py-6 bg-white/10 backdrop-blur-sm border-gray-600 text-white rounded-lg focus:ring-[rgb(37,150,190)] focus:border-[rgb(37,150,190)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        <Container>
          <main className="container mx-auto  py-12">
            {/* Category Tabs */}
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="mb-12"
            >
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-[rgb(37,150,190)] data-[state=active]:text-white capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* FAQ Content */}
            <div className=" max-w-6xl mx-auto">
              {/* Right Side - FAQ Items */}
              <div>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((item) => (
                    <div
                      key={item.id}
                      className=" mb-4 bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-sm border border-gray-400 dark:border-gray-800 hover:shadow-md transition-all duration-200"
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
                              className="ml-3 text-xs border-gray-400 dark:border-gray-700 text-gray-500 dark:text-gray-400"
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
            </div>

           

            {/* Popular Topics */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Popular Help Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href="/help/getting-started"
                  className="bg-white dark:bg-[#1a2342] p-6 rounded-xl border border-gray-400 dark:border-gray-800 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                >
                  <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-[rgb(37,150,190)]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Getting Started
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Learn how to create an account, navigate the platform, and
                    enroll in your first course.
                  </p>
                </Link>

                <Link
                  href="/help/account-management"
                  className="bg-white dark:bg-[#1a2342] p-6 rounded-xl border border-gray-400 dark:border-gray-800 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Account Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Update your profile, manage subscriptions, and adjust
                    notification settings.
                  </p>
                </Link>

                <Link
                  href="/help/troubleshooting"
                  className="bg-white dark:bg-[#1a2342] p-6 rounded-xl border border-gray-400 dark:border-gray-800 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                >
                  <div className="bg-amber-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <HelpCircle className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Troubleshooting
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Solutions for common technical issues, video playback
                    problems, and mobile app support.
                  </p>
                </Link>
              </div>
            </div>
          </main>
        </Container>
      </div>
    </div>
  );
}
