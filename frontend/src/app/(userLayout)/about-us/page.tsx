"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Award,
  BookOpen,
  Globe,
  Target,
  Zap,
} from "lucide-react";
import Container from "@/components/shared/Container";
import { teamMembers } from "@/constant";
import { motion } from "framer-motion";

export default function AboutPage() {
  // Team members data

  return (
    <Container>
      <div className="min-h-screen font-poppins">
        <div className=" min-h-screen transition-colors duration-200">
          {/* Hero Section */}
          <section className="py-12 md:py-12 lg:py-16 relative overflow-hidden border-b border-gray-200 dark:border-gray-700">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center"
              >
                <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                  Our Story
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                  Transforming Education for the Digital Age
                </h1>
                <p className="text-slate-700 dark:text-gray-300 text-lg mb-8">
                  Were on a mission to make quality education accessible to
                  everyone, everywhere. Our platform connects learners with
                  expert instructors and cutting-edge courses.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white px-6 py-6"
                  >
                    <Link href="/courses">
                      Explore Our Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-600 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 px-6 py-6"
                  >
                    <Link href="#team">Meet Our Team</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Our Mission Section */}
          <section className="py-9 md:py-12 lg:py-16 relative overflow-hidden border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-between items-center">
                <div>
                  <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                    Our Mission
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Empowering Learners to Reach Their Full Potential
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Founded in 2018, ELearning was born from a simple idea:
                    education should be accessible, engaging, and effective for
                    everyone. We believe that technology can break down barriers
                    to quality education and create opportunities for learners
                    worldwide.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Our platform brings together expert instructors,
                    cutting-edge curriculum design, and interactive learning
                    experiences to help students master new skills and advance
                    their careers.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-2 rounded-lg mr-4">
                        <Users className="h-5 w-5 text-[rgb(37,150,190)]" />
                      </div>
                      <div>
                        <h1 className="font-medium text-gray-900 dark:text-white mb-1">
                          500K+ Students
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          From over 150 countries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-2 rounded-lg mr-4">
                        <BookOpen className="h-5 w-5 text-[rgb(37,150,190)]" />
                      </div>
                      <div>
                        <h1 className="font-medium text-gray-900 dark:text-white mb-1">
                          20K+ Courses
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Across diverse categories
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-2 rounded-lg mr-4">
                        <Award className="h-5 w-5 text-[rgb(37,150,190)]" />
                      </div>
                      <div>
                        <h1 className="font-medium text-gray-900 dark:text-white mb-1">
                          Industry Recognition
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Award-winning platform
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-2 rounded-lg mr-4">
                        <Globe className="h-5 w-5 text-[rgb(37,150,190)]" />
                      </div>
                      <div>
                        <h1 className="font-medium text-gray-900 dark:text-white mb-1">
                          Global Impact
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Changing lives through education
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -z-10 w-64 h-64 bg-[rgb(37,150,190)]/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <Image
                    src={"/fff.png"}
                    alt="Students learning online"
                    width={700}
                    height={400}
                    className="rounded-lg w-[500px] shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="py-9 md:py-12 lg:py-16 relative overflow-hidden border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                  Our Values
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Principles That Guide Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  These core values shape everything we do, from course
                  development to student support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-[rgb(37,150,190)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Excellence
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Were committed to delivering the highest quality educational
                    content and experiences. Our rigorous standards ensure that
                    every course meets our benchmarks for accuracy, engagement,
                    and effectiveness.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[rgb(37,150,190)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Inclusivity
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Education should be accessible to everyone. We design our
                    platform and courses to accommodate diverse learning styles,
                    backgrounds, and needs, ensuring that all students can
                    succeed.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="bg-[rgb(37,150,190)]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[rgb(37,150,190)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Innovation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We continuously explore new technologies and teaching
                    methodologies to enhance the learning experience. Our
                    platform evolves with the changing needs of learners and the
                    job market.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section
            id="team"
            className="py-8 md:py-10 lg:py-14  border-b border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                  Our Team
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Meet the People Behind ELearning
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  Our diverse team of educators, technologists, and industry
                  experts is united by a passion for transforming education.
                </p>
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white dark:bg-[#1a2342] rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md"
                  >
                    <Image
                      src={member.image || "/g.jpg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[rgb(37,150,190)] mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm text-balance">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center mt-12">
                <Link
                  href="/careers"
                  className="text-[rgb(37,150,190)] hover:text-[rgb(37,150,190)]/80 font-medium inline-flex items-center border border-teal-400 px-3 py-2 rounded-md"
                >
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12  dark:bg-gradient-to-r from-[#151f38] to-[#1a2342] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-boldtext-slate-800 dark:text-white mb-6">
                  Ready to Start Your Learning Journey?
                </h2>
                <p className="text-slate-800 dark:text-gray-300 text-lg mb-8">
                  Join our community of learners and transform your skills with
                  our expert-led courses.
                </p>
                <Button
                  asChild
                  className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white px-8 py-6 text-lg"
                >
                  <Link href="/courses">
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
