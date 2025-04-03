import FaqSection from "@/components/home/FaqSection";
import FeaturedCourse from "@/components/home/FeaturedCourse";
import Hero from "@/components/home/Hero";
export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCourse />
      <FaqSection />
    </div>
  );
}
