"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/Container";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  course: string;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Emily Johnson",
      role: "UX Designer",
      company: "Creative Solutions",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "This platform completely transformed my career path. The UI/UX Design Masterclass provided practical skills that I immediately applied to my work. Within three months of completing the course, I received a promotion and a 30% salary increase. The instructor's teaching style made complex concepts easy to understand.",
      course: "UI/UX Design Masterclass",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      company: "Tech Innovations",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "I've taken many coding courses, but the Complete Web Development Bootcamp here stands out. The curriculum is comprehensive and up-to-date with the latest industry standards. The hands-on projects helped me build an impressive portfolio that landed me my dream job. Worth every penny!",
      course: "Complete Web Development Bootcamp",
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Marketing Director",
      company: "Growth Strategies",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.5,
      text: "The Digital Marketing Strategy course exceeded my expectations. I was able to implement the strategies I learned and saw a 45% increase in our company's social media engagement within weeks. The instructor provides real-world examples and actionable insights that you can apply immediately.",
      course: "Digital Marketing Strategy & Social Media",
    },
    {
      id: 4,
      name: "David Chen",
      role: "Data Analyst",
      company: "Insight Analytics",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "As someone transitioning into data science, this course was exactly what I needed. The instructor breaks down complex concepts into digestible pieces, and the community support is incredible. I went from knowing basic Excel to implementing machine learning models in just a few months.",
      course: "Data Science & Machine Learning Fundamentals",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Mobile Developer",
      company: "AppWorks",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.5,
      text: "The React Native course helped me transition from web to mobile development seamlessly. The instructor's attention to detail and the comprehensive curriculum gave me the confidence to build and deploy my first app to the App Store. I'm now working as a lead mobile developer thanks to this course.",
      course: "Mobile App Development with React Native",
    },
  ];
  // Function to render stars
  const renderStars = (count = 5) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ));
  };
  return (
    <div className="border-b border-gray-700">
      <Container>
        <section className="py-16 relative overflow-hidden ">
          {/* Background Elements */}

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(37,150,190)]/5 rounded-full blur-3xl"></div>

            {/* Quote Icons */}
            <div className="absolute top-20 left-20 opacity-10 dark:opacity-5">
              <Quote className="h-24 w-24 text-[rgb(37,150,190)]" />
            </div>
            <div className="absolute bottom-20 right-20 opacity-10 dark:opacity-5">
              <Quote className="h-24 w-24 text-[rgb(37,150,190)] transform rotate-180" />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gray-900 dark:text-white">What Our </span>
                <span className="bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
                  Students Say
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover how our courses have helped students transform their
                careers and achieve their goals.
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-[#131c36] rounded-lg p-6 shadow-lg border border-gray-800 h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-[rgb(37,150,190)]/30"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex">{renderStars()}</div>
                  </div>

                  <div className="text-gray-300 flex-grow">
                    <p>{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Reviews Link */}
            <div className="text-center mt-10">
              <a
                href="#"
                className="text-[rgb(37,150,190)] hover:text-[rgb(37,150,190)]/80 font-medium inline-flex items-center"
              >
                View More Reviews
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
