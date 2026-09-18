"use client";

import { ArrowRight, BookMarked, BookOpen, Users, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";
import Image from "next/image";
import "../../app/globals.css";
import Link from "next/link";
import { BlurFade } from "../magicui/blur-fade";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// Animated counter hook
function useCounter(target: number, inView: boolean) {
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      count.set(target);
    }
  }, [inView, target, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [rounded]);

  return display;
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  inView,
  color,
}: {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  color: string;
}) {
  const count = useCounter(value, inView);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className={`p-2 rounded-full mb-2 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xl font-bold text-gray-900 dark:text-white">
        {count}
        {suffix}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
    </div>
  );
}

// Typewriter effect
const roles = ["Developers", "Designers", "Data Scientists", "Entrepreneurs"];

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="bg-gradient-to-r from-[rgb(37,150,190)] to-purple-500 text-transparent bg-clip-text">
      {displayed}
      <span className="animate-pulse text-[rgb(37,150,190)]">|</span>
    </span>
  );
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden py-10 lg:py-0 border-b border-gray-300 dark:border-gray-800">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-[#0C111B] dark:via-[#131c36] dark:to-[#0C111B] z-0" />

      {/* Animated Blobs */}
      <div className="blob blob-1 absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/15 dark:bg-[rgb(37,150,190)]/10 rounded-full blur-3xl" />
      <div className="blob blob-3 absolute top-40 right-20 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl" />
      <div className="blob blob-4 absolute bottom-40 left-20 w-56 h-56 bg-[rgb(37,150,190)]/15 dark:bg-[rgb(37,150,190)]/15 rounded-full blur-3xl" />

      <Container>
        <div className="flex items-center lg:justify-center min-h-screen w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-8 order-2 md:order-1">
              <BlurFade delay={0.1} inView>
                <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 cursor-default px-4 py-1.5 text-sm font-medium tracking-wide">
                  ✦ Transform Your Learning Journey
                </Badge>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                  Learn Skills Built
                  <br />
                  for <TypewriterText />
                </h1>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                  Join our community of 500K+ learners and access 20K+ courses taught by industry experts. Start your learning journey today.
                </p>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <div className="flex flex-wrap gap-4">
                  <Link href="/sign-in">
                    <Button className="relative bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/90 text-white px-8 py-6 text-base font-semibold rounded-xl group transition-all duration-300 hover:shadow-xl hover:shadow-[rgb(37,150,190)]/30 overflow-hidden">
                      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2">
                        Get Started Free
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-base rounded-xl transition-all duration-300 group"
                    >
                      Explore Courses
                      <BookMarked className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </BlurFade>

              {/* Animated Stats */}
              <BlurFade delay={0.5} inView>
                <div
                  ref={statsRef}
                  className="pt-6 border-t border-gray-200 dark:border-gray-700/60 flex flex-wrap gap-2"
                >
                  <StatItem icon={Users} value={500} suffix="K+" label="Students" inView={statsInView} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
                  <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch mx-2" />
                  <StatItem icon={BookOpen} value={20} suffix="K+" label="Courses" inView={statsInView} color="bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)]" />
                  <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch mx-2" />
                  <StatItem icon={Star} value={98} suffix="%" label="Satisfaction" inView={statsInView} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" />
                  <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch mx-2" />
                  <StatItem icon={Award} value={100} suffix="+" label="Instructors" inView={statsInView} color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" />
                </div>
              </BlurFade>
            </div>

            {/* Right Content */}
            <div className="order-1 md:order-2 flex items-center justify-center relative">
              {/* Glow circle — perfectly centered behind the image */}
              <div className="hero_animation absolute inset-0 m-auto w-[420px] h-[420px] lg:w-[500px] lg:h-[500px] rounded-full" />

              {/* Floating image with gentle bob animation */}
              <BlurFade delay={0.3} inView>
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Image
                    src="/h1.png"
                    alt="Hero Illustration"
                    width={520}
                    height={520}
                    className="object-contain w-[320px] md:w-[400px] lg:w-[500px] drop-shadow-2xl"
                    priority
                    quality={100}
                  />
                </motion.div>
              </BlurFade>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
