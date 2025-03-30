import {
  Search,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-[#0C111B] dark:via-[#131c36] dark:to-[#0C111B] z-0"></div>

      {/* Interactive Animated Blobs */}
      <div className="blob blob-1 absolute top-20 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 dark:bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
      <div className="blob blob-2 absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="blob blob-3 absolute top-40 right-20 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="blob blob-4 absolute bottom-40 left-20 w-56 h-56 bg-[rgb(37,150,190)]/15 dark:bg-[rgb(37,150,190)]/15 rounded-full blur-3xl"></div>

      {/* New Blobs on Left Side */}
      <div className="blob blob-5 absolute top-60 left-40 w-72 h-72 bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="blob blob-6 absolute bottom-80 left-60 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl"></div>

      {/* Content */}

      <Container>
      <div className=" mx-auto  py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm">
              Transform Your Learning Journey
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Improve Your Online Learning Experience Better Instantly
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
              Join our community of 500K+ learners and access 20K+ courses
              taught by industry experts. Start your learning journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white px-8 py-6 text-lg rounded-lg group transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(37,150,190)]/20">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-lg rounded-lg transition-all duration-300"
              >
                Explore Courses
                <BookMarked className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <div className="flex justify-center">
                  <BookOpen className="h-6 w-6 text-[rgb(37,150,190)]" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  20K+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Courses
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Users className="h-6 w-6 text-[rgb(37,150,190)]" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  500K+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Students
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Award className="h-6 w-6 text-[rgb(37,150,190)]" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  100%
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Search and Featured Courses */}
          <div className="relative h-full">
            {/* Floating Card with Hover Effect */}
            <div className="bg-white dark:bg-[#151f38] p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-[rgb(37,150,190)]/10 dark:hover:shadow-[rgb(37,150,190)]/5 h-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Find Your Perfect Course
              </h3>

              {/* Search */}
              <div className="flex w-full mb-6">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="rounded-r-none bg-gray-50 dark:bg-[#0C111B] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
                <Button className="rounded-l-none bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80">
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              {/* Featured Courses */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a2342] transition-all duration-200 cursor-pointer hover:translate-x-1">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">
                      Web Development
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      120+ courses
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a2342] transition-all duration-200 cursor-pointer hover:translate-x-1">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <PlayCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">
                      Data Science
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      85+ courses
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a2342] transition-all duration-200 cursor-pointer hover:translate-x-1">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <BookMarked className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">
                      Digital Marketing
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      65+ courses
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-white dark:border-[#151f38]">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white dark:border-[#151f38]">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white dark:border-[#151f38]">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Join 500K+ learners today
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[rgb(37,150,190)]/30 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
        </div>
        </Container>
    </section>
  );
}
