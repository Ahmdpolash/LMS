import Image from "next/image";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/Container";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SectionHeaders from "./SectionHeaders";
import Marquee from "react-fast-marquee";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  course: string;
}

export default function TestimonialsSection() {
  const testimonials: any[] = [
    {
      id: 1,
      name: "Gene Bates",
      role: "Student",
      organization: "Cambridge university",
      image: "/u.jpg",
      text: "I had the pleasure of exploring ELearning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out ELearning!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jay Gibbs",
      role: "computer systems engineering student",
      organization: "Zimbabwe",
      image: "/u.jpg",

      text: "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge.",
      rating: 5,
    },
    {
      id: 3,
      name: "Verna Santos",
      role: "Full stack developer",
      organization: "Quarter ltd.",
      image: "/u.jpg",

      text: "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights.",
      rating: 5,
    },
    {
      id: 4,
      name: "Mina Davidson",
      role: "UX Designer",
      organization: "Creative Solutions",
      image: "/u.jpg",

      text: "The UI/UX Design Masterclass on this platform completely transformed my career. The instructor's teaching approach made complex design principles easy to understand and apply. Within weeks of completing the course, I was able to create more intuitive and visually appealing interfaces. The community support and feedback system also helped me refine my skills further.",
      rating: 5,
    },
  ];

  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  // Function to render stars
  const renderStars = (count = 5) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ));
  };
  return (
    <div className="border-b border-gray-400 dark:border-gray-700">
      <Container>
        <section className="py-16 relative overflow-hidden ">
          {/* Background Elements */}

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute blob-1 top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/5 rounded-full blur-3xl"></div>
            <div className="absolute blob-2 bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute blob-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(37,150,190)]/5 rounded-full blur-3xl"></div>

            {/* Quote Icons */}
            <div className="absolute top-10 left-0 opacity-10 rotate-180">
              <Quote className="h-32 w-32 text-[rgb(37,150,190)]" />
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 transform ">
              <Quote className="h-32 w-32 text-[rgb(37,150,190)]" />
            </div>
          </div>

          <div className="  mx-auto px-4 relative z-10">
            <SectionHeaders
              badge=" Student Reviews"
              description="Our students have shared their success stories and experiences with our courses. Read their testimonials to see how we've helped them achieve their goals."
              title1="What Our"
              title2="Students Are Saying"
            />

            {/*  card */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="dark:bg-[#131c36]  rounded-lg p-6 shadow-lg border border-gray-400 dark:border-gray-700 h-full flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="h-[55px] w-[55px] rounded-full border-2 border-[rgb(37,150,190)]/30"
                          />
                        </div>
                        <div>
                          <h3 className="text-black dark:text-white font-semibold text-lg">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex">{renderStars()}</div>
                    </div>

                    <div className="text-slate-600 dark:text-gray-300 flex-grow">
                      <span>{testimonial.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center ">
                <Button
                  variant="outline"
                  className="cursor-pointer border-[rgb(37,150,190)] text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/10 group"
                >
                  Load More Reviews
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

/*


<img
              alt=""
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg={1}
              className="absolute w-[100px] left-[15%] top-[120px] hidden md:block"
              style={{ color: "transparent" }}
              src={'/h.svg'}
            />
            <Image
              alt=""
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg={1}
              className="absolute w-[100px] left-[5%] top-[12%] hidden md:block"
              style={{ color: "transparent" }}
              src={'/m.svg'}

            />
*/
{
  /* Testimonial Cards */
}
{
  /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
            </div> */
}
