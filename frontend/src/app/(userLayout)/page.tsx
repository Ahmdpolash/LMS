import CategorySection from "@/components/home/Category";
import CTASection from "@/components/home/CtaSection";
import FaqSection from "@/components/home/FaqSection";
import FeaturedCourse from "@/components/home/FeaturedCourse";
import Hero from "@/components/home/Hero";
import TestimonialsSection from "@/components/home/Testimonial";
export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedCourse />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
    </div>
  );
}
