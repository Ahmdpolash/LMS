"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import Container from "../shared/Container";
import SectionHeaders from "./SectionHeaders";
import { renderStars } from "@/app/_components/pages/CourseDetails/RenderStar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Gene Bates",
    role: "Student",
    organization: "Cambridge University",
    image: "/u.jpg",
    text: "I was thoroughly impressed — the website offers a comprehensive selection of courses that cater to different skill levels. Exactly what I needed to level up my skills.",
    rating: 4,
  },
  {
    id: 2,
    name: "Jay Gibbs",
    role: "Systems Engineering Student",
    organization: "Zimbabwe",
    image: "/u2.avif",
    text: "Your teaching style is outstanding and the quality of tutorials is top-notch. Breaking down complex topics into manageable parts is what sets this platform apart.",
    rating: 4,
  },
  {
    id: 3,
    name: "Verna Santos",
    role: "Full Stack Developer",
    organization: "Quarter Ltd.",
    image: "/u3.avif",
    text: "The practical applications and real-world examples are truly impressive. This platform helped me land my first developer job within 3 months of completing a course.",
    rating: 5,
  },
  {
    id: 4,
    name: "Mina Davidson",
    role: "UX Designer",
    organization: "Creative Solutions",
    image: "/u4.jpg",
    text: "The UI/UX Design Masterclass completely transformed my career. Complex design principles were made easy to understand and apply from day one.",
    rating: 4,
  },
  {
    id: 5,
    name: "Omar Khalid",
    role: "Software Engineer",
    organization: "TechNova",
    image: "/u2.avif",
    text: "The structured curriculum completely changed my approach to learning. Instructors' practical examples have been instrumental in my career growth.",
    rating: 5,
  },
  {
    id: 6,
    name: "Sophia Lee",
    role: "Data Analyst",
    organization: "Insight Analytics",
    image: "/u3.avif",
    text: "Packed with practical case studies, hands-on projects, and datasets from real companies. This platform exceeded my expectations in every possible way.",
    rating: 5,
  },
  {
    id: 7,
    name: "Marcus Rivera",
    role: "Backend Developer",
    organization: "NexGen Labs",
    image: "/u.jpg",
    text: "The course content is always up to date with industry standards. I've recommended this platform to every developer in my team — it's that good.",
    rating: 5,
  },
  {
    id: 8,
    name: "Aisha Patel",
    role: "Product Manager",
    organization: "Venture Co.",
    image: "/u4.jpg",
    text: "Lifetime access and expert instructors make this the best investment I've made in my professional development. Absolutely worth every penny.",
    rating: 4,
  },
];

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="mx-3 w-[320px] flex-shrink-0 bg-white dark:bg-[#131c36] border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Quote icon */}
      <Quote className="h-6 w-6 text-[rgb(37,150,190)]/40 mb-3" />

      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 line-clamp-4">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover border-2 border-[rgb(37,150,190)]/30"
          />
          <div>
            <p className="text-gray-900 dark:text-white font-semibold text-sm">
              {testimonial.name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              {testimonial.role} · {testimonial.organization}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5">{renderStars(testimonial.rating)}</div>
      </div>
    </div>
  );
}

// Split into two rows for marquee
const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4);

export default function TestimonialsSection() {
  return (
    <div className="border-b border-gray-400 dark:border-gray-700 overflow-hidden">
      <section className="py-16 relative">
        {/* Subtle background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <Container>
          <SectionHeaders
            badge="Student Reviews"
            description="Our students have shared their success stories. Read their testimonials to see how we've helped them achieve their goals."
            title1="What Our"
            title2="Students Are Saying"
          />
        </Container>

        {/* Row 1 — scrolls left */}
        <div className="mb-4">
          <Marquee gradient={false} speed={38} pauseOnHover className="py-2">
            {[...row1, ...row1].map((t, idx) => (
              <TestimonialCard key={`r1-${idx}`} testimonial={t} />
            ))}
          </Marquee>
        </div>

        {/* Row 2 — scrolls right */}
        <Marquee gradient={false} speed={32} direction="right" pauseOnHover className="py-2">
          {[...row2, ...row2].map((t, idx) => (
            <TestimonialCard key={`r2-${idx}`} testimonial={t} />
          ))}
        </Marquee>
      </section>
    </div>
  );
}
