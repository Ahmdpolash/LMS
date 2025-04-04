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
import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";
import Image from "next/image";
import "../../app/globals.css"; // Import global styles for the blobs
import Link from "next/link";
import { BlurFade } from "../magicui/blur-fade";
import { TextAnimate } from "../magicui/text-animate";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-10 lg:py-0 border-b border-gray-300 dark:border-gray-800">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-[#0C111B] dark:via-[#131c36] dark:to-[#0C111B] z-0"></div>

      {/* Interactive Animated Blobs */}
      <div className="blob blob-1  absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/15 dark:bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>

      <div className="blob blob-3 absolute top-40 right-20 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="blob blob-4 absolute bottom-40 left-20 w-56 h-56 bg-[rgb(37,150,190)]/15 dark:bg-[rgb(37,150,190)]/15 rounded-full blur-3xl"></div>

      {/* Content */}

      <Container>
        <div className=" flex items-center lg:justify-center min-h-screen w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8  order-2 md:order-1 lg:order-1 2xl:order-1">
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 cursor-grab px-4 py-1 text-sm">
                "Transform Your Learning Journey"
              </Badge>

              <TextAnimate
                className="selection:bg-blue-600 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white "
                animation="fadeIn"
                by="line"
                as="p"
              >
                {"Improve Your Online Learning Experience Better Instantly"}
              </TextAnimate>

              <TextAnimate
                className="text-lg text-gray-700 dark:text-gray-300 "
                animation="fadeIn"
                by="line"
                as="p"
              >
                {` Join our community of 500K+ learners and access 20K+ courses\n\n taught by industry experts. Start your learning journey today.`}
              </TextAnimate>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/sign-in"}>
                  <Button className="bg-[rgb(37,150,190)] cursor-pointer hover:bg-[rgb(37,150,190)]/80 text-white px-8 py-6 text-[17px] font-medium rounded-lg group transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(37,150,190)]/20">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href={"/courses"}>
                  <Button
                    variant="outline"
                    className="border-gray-300 cursor-pointer dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-[17px] rounded-lg transition-all duration-300"
                  >
                    Explore Courses
                    <BookMarked className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
            </div>

            {/* Right Content - Search and Featured Courses */}

            <div className="order-1 lg:order-2 2xl:order-2  mx-auto lg:mx-0 text-center pb-16 lg:pb-0">
              <div className=" hero_animation absolute lg:top-[85px] w-[55vh] h-[55vh] lg:h-[540px]  lg:w-[540px] rounded-[50%] " />

              <div className="z-50 relative ">
                <BlurFade key={"/h1.png"} delay={0.25 + 1 * 0.05} inView>
                  <Image
                    src={"/h1.png"}
                    alt=""
                    width={345}
                    height={345}
                    className="object-contain w-full z-[50] pt-8 lg:pt-0 mx-auto lg:mx-0 text-center "
                  />
                </BlurFade>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/*
 
 mx-auto  py-16 md:py-12 

    {/* <div className="flex gap-x-7 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex justify-center">
                    <BookOpen className="h-6 w-6 text-[rgb(37,150,190)]" />
                  </div>
                  <p className="text-xl font-medium text-gray-900 dark:text-white mt-2">
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
                  <p className="text-xl font-medium text-gray-900 dark:text-white mt-2">
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
                  <p className="text-xl font-medium text-gray-900 dark:text-white mt-2">
                    100%
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Satisfaction
                  </p>
                </div>
              </div> */
