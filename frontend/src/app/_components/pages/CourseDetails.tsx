"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Award,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Globe,
  Heart,
  Info,
  Layers,
  Lock,
  Play,
  Share2,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CourseDetails() {
  const params = useParams();

  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<number[]>([0]); // First section expanded by default
  const [showMore, setShowMore] = useState(false);

  // Toggle curriculum section
  const toggleSection = (sectionIndex: number) => {
    if (expandedSections.includes(sectionIndex)) {
      setExpandedSections(expandedSections.filter((i) => i !== sectionIndex));
    } else {
      setExpandedSections([...expandedSections, sectionIndex]);
    }
  };

  // Mock course data - in a real app, this would be fetched from an API
  const courseData = {
    id: 1,
    title: "Complete Web Development Bootcamp: From Zero to Hero",
    subtitle:
      "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and more! Build real-world projects and become a full-stack developer.",
    rating: 4.8,
    reviewCount: 2547,
    studentsCount: 15420,
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Web Developer & Instructor",
      bio: "Sarah is a senior web developer with over 10 years of experience in the industry. She has worked with companies like Google, Facebook, and Amazon, and has taught over 100,000 students online. Her teaching style is practical, project-based, and focused on real-world applications.",
      image: "/placeholder.svg?height=100&width=100",
      coursesCount: 12,
      studentsCount: 145000,
      reviewsAverage: 4.9,
    },
    lastUpdated: "April 2025",
    language: "English",
    price: 99.99,
    discountPrice: 84.99,
    discountEnds: "May 15, 2025",
    image: "/placeholder.svg?height=400&width=700",
    level: "All Levels",
    duration: "42 hours",
    lectures: 142,
    articles: 15,
    downloadableResources: 24,
    hasCertificate: true,
    description: `
      <p>This comprehensive web development bootcamp covers everything you need to know to become a full-stack web developer. Whether you're a complete beginner or have some experience, this course will take you from the basics to advanced concepts.</p>
      <p>You'll learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more. By the end of this course, you'll have built multiple real-world projects that you can add to your portfolio.</p>
      <p>The course is constantly updated with new content, projects, and modules. You'll have lifetime access to all course materials, including future updates.</p>
    `,
    whatYouWillLearn: [
      "Build responsive, accessible, and beautiful websites using HTML5 and CSS3",
      "Master JavaScript including ES6+ features and learn how to build interactive web applications",
      "Create full-stack applications using React for the frontend and Node.js for the backend",
      "Work with databases like MongoDB and learn how to integrate them into your applications",
      "Implement authentication and authorization in your web applications",
      "Deploy your applications to the web using various hosting platforms",
      "Optimize your websites for performance and search engines",
      "Build a portfolio of real-world projects to showcase to potential employers",
    ],
    requirements: [
      "A computer (Windows, Mac, or Linux) with internet access",
      "No prior programming experience required - we'll start from the very basics",
      "Basic computer skills and familiarity with using the internet",
      "Willingness to learn and practice regularly",
    ],
    targetAudience: [
      "Complete beginners with no prior programming experience",
      "People who know basic HTML and CSS but want to expand their skills",
      "Programmers from other languages who want to learn web development",
      "Anyone who wants to become a full-stack web developer",
    ],
    curriculum: [
      {
        title: "Introduction to Web Development",
        lectures: 8,
        duration: "2h 15m",
        content: [
          {
            title: "Welcome to the Course",
            duration: "5:20",
            type: "video",
            isPreview: true,
          },
          {
            title: "How the Internet Works",
            duration: "12:45",
            type: "video",
            isPreview: true,
          },
          {
            title: "Setting Up Your Development Environment",
            duration: "18:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "Web Development Overview",
            duration: "15:10",
            type: "video",
            isPreview: false,
          },
          {
            title: "Frontend vs Backend Development",
            duration: "14:25",
            type: "video",
            isPreview: false,
          },
          {
            title: "Introduction to Version Control with Git",
            duration: "22:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "Web Development Tools and Resources",
            duration: "16:40",
            type: "article",
            isPreview: false,
          },
          {
            title: "Section Quiz",
            duration: "30:00",
            type: "quiz",
            isPreview: false,
          },
        ],
      },
      {
        title: "HTML Fundamentals",
        lectures: 12,
        duration: "3h 45m",
        content: [
          {
            title: "Introduction to HTML",
            duration: "10:15",
            type: "video",
            isPreview: true,
          },
          {
            title: "HTML Document Structure",
            duration: "14:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "Working with Text Elements",
            duration: "18:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "HTML Lists and Tables",
            duration: "22:10",
            type: "video",
            isPreview: false,
          },
          {
            title: "HTML Forms and Input Elements",
            duration: "25:45",
            type: "video",
            isPreview: false,
          },
          {
            title: "HTML5 Semantic Elements",
            duration: "16:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "HTML Multimedia Elements",
            duration: "19:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "HTML Best Practices",
            duration: "12:40",
            type: "article",
            isPreview: false,
          },
          {
            title: "HTML Accessibility",
            duration: "20:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "HTML Project: Building a Personal Website",
            duration: "35:20",
            type: "project",
            isPreview: false,
          },
          {
            title: "HTML Resources and References",
            duration: "10:15",
            type: "article",
            isPreview: false,
          },
          {
            title: "Section Quiz",
            duration: "30:00",
            type: "quiz",
            isPreview: false,
          },
        ],
      },
      {
        title: "CSS Fundamentals",
        lectures: 15,
        duration: "4h 30m",
        content: [
          {
            title: "Introduction to CSS",
            duration: "12:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Selectors and Properties",
            duration: "18:45",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Box Model",
            duration: "15:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Layout with Flexbox",
            duration: "28:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Grid Layout",
            duration: "32:10",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Responsive Design",
            duration: "24:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Animations and Transitions",
            duration: "22:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Variables and Custom Properties",
            duration: "16:40",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Frameworks Overview",
            duration: "14:25",
            type: "video",
            isPreview: false,
          },
          {
            title: "Introduction to Tailwind CSS",
            duration: "26:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "CSS Best Practices",
            duration: "15:10",
            type: "article",
            isPreview: false,
          },
          {
            title: "CSS Project: Styling Your Personal Website",
            duration: "40:20",
            type: "project",
            isPreview: false,
          },
          {
            title: "CSS Resources and References",
            duration: "12:15",
            type: "article",
            isPreview: false,
          },
          {
            title: "CSS Challenges",
            duration: "25:30",
            type: "exercise",
            isPreview: false,
          },
          {
            title: "Section Quiz",
            duration: "30:00",
            type: "quiz",
            isPreview: false,
          },
        ],
      },
      {
        title: "JavaScript Basics",
        lectures: 18,
        duration: "5h 15m",
        content: [
          {
            title: "Introduction to JavaScript",
            duration: "15:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Variables and Data Types",
            duration: "18:45",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Operators",
            duration: "14:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Control Flow",
            duration: "22:10",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Functions",
            duration: "25:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Arrays",
            duration: "20:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Objects",
            duration: "24:40",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript DOM Manipulation",
            duration: "28:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Events",
            duration: "22:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Scope and Closures",
            duration: "26:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Error Handling",
            duration: "18:45",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Asynchronous Programming",
            duration: "32:10",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Promises",
            duration: "24:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript ES6+ Features",
            duration: "28:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "JavaScript Best Practices",
            duration: "16:40",
            type: "article",
            isPreview: false,
          },
          {
            title: "JavaScript Project: Interactive Website",
            duration: "45:20",
            type: "project",
            isPreview: false,
          },
          {
            title: "JavaScript Resources and References",
            duration: "12:15",
            type: "article",
            isPreview: false,
          },
          {
            title: "Section Quiz",
            duration: "30:00",
            type: "quiz",
            isPreview: false,
          },
        ],
      },
      {
        title: "Advanced Topics and Final Projects",
        lectures: 14,
        duration: "6h 30m",
        content: [
          {
            title: "Introduction to React",
            duration: "30:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "Building Components with React",
            duration: "35:45",
            type: "video",
            isPreview: false,
          },
          {
            title: "React State and Props",
            duration: "28:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "React Hooks",
            duration: "32:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "Introduction to Node.js",
            duration: "25:10",
            type: "video",
            isPreview: false,
          },
          {
            title: "Building APIs with Express",
            duration: "38:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "Working with MongoDB",
            duration: "34:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "Authentication and Authorization",
            duration: "42:15",
            type: "video",
            isPreview: false,
          },
          {
            title: "Deploying Your Applications",
            duration: "28:40",
            type: "video",
            isPreview: false,
          },
          {
            title: "Final Project: Full-Stack Web Application",
            duration: "1:15:00",
            type: "project",
            isPreview: false,
          },
          {
            title: "Career Advice for Web Developers",
            duration: "22:30",
            type: "video",
            isPreview: false,
          },
          {
            title: "Building Your Portfolio",
            duration: "18:45",
            type: "video",
            isPreview: false,
          },
          {
            title: "Next Steps and Continued Learning",
            duration: "15:20",
            type: "video",
            isPreview: false,
          },
          {
            title: "Course Conclusion",
            duration: "10:15",
            type: "video",
            isPreview: false,
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Michael P.",
        image: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "April 2, 2025",
        comment:
          "This course is absolutely amazing! I started with zero knowledge of web development, and now I'm building full-stack applications. Sarah is an excellent instructor who explains complex concepts in a simple way. The projects are practical and helped me build a strong portfolio. Highly recommended!",
      },
      {
        id: 2,
        name: "Jennifer L.",
        image: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "March 28, 2025",
        comment:
          "Best web development course I've taken! The curriculum is well-structured, and the projects are challenging but doable. Sarah's teaching style is clear and engaging. I landed a junior developer job after completing this course. Worth every penny!",
      },
      {
        id: 3,
        name: "David K.",
        image: "/placeholder.svg?height=50&width=50",
        rating: 4,
        date: "March 15, 2025",
        comment:
          "Great course with comprehensive content. The only reason I'm giving 4 stars instead of 5 is that some sections could use more exercises. Otherwise, the explanations are clear, and the projects are excellent for building a portfolio.",
      },
      {
        id: 4,
        name: "Sophia R.",
        image: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "March 10, 2025",
        comment:
          "I've tried several web development courses, and this is by far the best one. Sarah explains everything in detail and provides real-world examples. The course is constantly updated with new content, which is a huge plus. I feel confident in my skills after completing this bootcamp.",
      },
      {
        id: 5,
        name: "James T.",
        image: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "February 28, 2025",
        comment:
          "This course exceeded my expectations! The content is up-to-date and relevant to the current job market. Sarah is an excellent instructor who responds quickly to questions. The projects are challenging and helped me understand how everything fits together. Highly recommended for anyone looking to become a web developer.",
      },
    ],
    relatedCourses: [
      {
        id: "advanced-javascript",
        title: "Advanced JavaScript: From Fundamentals to Mastery",
        instructor: "David Wilson",
        rating: 4.9,
        reviewCount: 2103,
        price: 109.99,
        image: "/placeholder.svg?height=120&width=200",
        level: "Advanced",
      },
      {
        id: "react-native",
        title: "Mobile App Development with React Native",
        instructor: "James Taylor",
        rating: 4.8,
        reviewCount: 1456,
        price: 119.99,
        discountPrice: 94.99,
        image: "/placeholder.svg?height=120&width=200",
        level: "Intermediate",
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design Masterclass",
        instructor: "Emma Rodriguez",
        rating: 4.7,
        reviewCount: 1245,
        price: 89.99,
        discountPrice: 69.99,
        image: "/placeholder.svg?height=120&width=200",
        level: "Beginner",
      },
    ],
  };

  // Function to render stars based on rating
  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={`${starSize} fill-yellow-400 text-yellow-400`}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${starSize} text-gray-300`} />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
      );
    }

    return stars;
  };

  // Calculate rating distribution
  const ratingDistribution = [85, 10, 3, 1, 1]; // Percentage of 5, 4, 3, 2, 1 star reviews

  return (
    <div className="min-h-screen font-poppins">
      <div className=" transition-colors duration-200">
        {/* Course Header */}
        <section className=" py-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Course Info */}
              <div className="lg:w-7/12">
                <div className="flex items-center mb-4">
                  <Badge className="bg-[rgb(37,150,190)] text-white mr-2">
                    Bestseller
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-gray-500"
                  >
                    {courseData.level}
                  </Badge>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {courseData.title}
                </h1>

                <p className="text-gray-300 text-[17px] mb-6">
                  This comprehensive web development bootcamp covers everything
                  you need to know to become a full-stack web developer. Whether
                  you're a complete beginner or have some experience, this
                  course will take you from the basics to advanced concepts.
                  You'll learn HTML, CSS, JavaScript, React, Node.js, Express,
                  MongoDB, and more. By the end of this course, you'll have
                  built multiple real-world projects that you can add to your
                  portfolio. The course is constantly updated with new content,
                  projects, and modules. You'll have lifetime access to all
                  course materials, including future updates.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(courseData.rating, "md")}
                    </div>
                    <span className="text-[rgb(37,150,190)] font-medium">
                      {courseData.rating}
                    </span>
                    <span className="text-gray-300 ml-1">
                      ({courseData.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Users className="h-5 w-5 mr-1" />
                    <span>
                      {courseData.studentsCount.toLocaleString()} students
                    </span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 mr-1" />
                    <span>Last updated {courseData.lastUpdated}</span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Globe className="h-5 w-5 mr-1" />
                    <span>{courseData.language}</span>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage
                      src={courseData.instructor.image}
                      alt={courseData.instructor.name}
                    />
                    <AvatarFallback>
                      {courseData.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">Created by</p>
                    <Link
                      href={`/instructor/${courseData.instructor.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-[rgb(37,150,190)] hover:underline"
                    >
                      {courseData.instructor.name}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Course Preview Card */}
              <div className="lg:w-5/12">
                <div className="bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <Image
                      src={"/c.jpg"}
                      alt={courseData.title}
                      width={700}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        variant="outline"
                        className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30"
                      >
                        <Play className="h-5 w-5 mr-2" fill="white" />
                        Preview Course
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${courseData.discountPrice}
                        </span>
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                          ${courseData.price}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-red-500 border-red-500"
                      >
                        {Math.round(
                          (1 - courseData.discountPrice / courseData.price) *
                            100
                        )}
                        % off
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Sale ends in 2 days!
                    </p>

                    <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white mb-3">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>

                    <Button variant="outline" className="w-full mb-6">
                      Try For Free
                    </Button>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      30-Day Money-Back Guarantee
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Duration:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseData.duration}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Layers className="h-4 w-4 inline mr-1" />
                          Lectures:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseData.lectures}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <FileText className="h-4 w-4 inline mr-1" />
                          Articles:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseData.articles}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <Download className="h-4 w-4 inline mr-1" />
                          Resources:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {courseData.downloadableResources}
                        </span>
                      </div>

                      {courseData.hasCertificate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">
                            <Award className="h-4 w-4 inline mr-1" />
                            Certificate:
                          </span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            Yes, upon completion
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        Wishlist
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Gift
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-8/12">
                {/* Tabs Navigation */}
                <Tabs
                  defaultValue="overview"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="mb-8"
                >
                  <TabsList className="w-full grid grid-cols-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1">
                    <TabsTrigger
                      value="overview"
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="curriculum"
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
                    >
                      Curriculum
                    </TabsTrigger>
                    <TabsTrigger
                      value="instructor"
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
                    >
                      Instructor
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-8">
                      {/* Description */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Description
                        </h3>
                        <div
                          className="prose prose-gray dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: courseData.description,
                          }}
                        />
                      </div>

                      {/* What You'll Learn */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          What You'll Learn
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {courseData.whatYouWillLearn.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-[rgb(37,150,190)] mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Requirements
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {courseData.requirements.map((item, index) => (
                            <li
                              key={index}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Target Audience */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Who This Course is For
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {courseData.targetAudience.map((item, index) => (
                            <li
                              key={index}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Curriculum Tab */}
                  <TabsContent value="curriculum" className="mt-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Course Content
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {courseData.lectures} lectures • {courseData.duration}{" "}
                          total length
                        </div>
                      </div>

                      <div className="space-y-4">
                        {courseData.curriculum.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                          >
                            <button
                              className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 text-left"
                              onClick={() => toggleSection(sectionIndex)}
                            >
                              <div className="flex items-center">
                                <ChevronDown
                                  className={`h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 transition-transform ${
                                    expandedSections.includes(sectionIndex)
                                      ? "transform rotate-180"
                                      : ""
                                  }`}
                                />
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {section.title}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {section.lectures} lectures • {section.duration}
                              </div>
                            </button>

                            <AnimatePresence>
                              {expandedSections.includes(sectionIndex) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                                    {section.content.map(
                                      (lecture, lectureIndex) => (
                                        <div
                                          key={lectureIndex}
                                          className="flex justify-between items-center py-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-lg px-2"
                                        >
                                          <div className="flex items-center">
                                            {lecture.isPreview ? (
                                              <Play className="h-4 w-4 text-[rgb(37,150,190)] mr-3" />
                                            ) : (
                                              <Lock className="h-4 w-4 text-gray-400 mr-3" />
                                            )}
                                            <span
                                              className={`${
                                                lecture.isPreview
                                                  ? "text-gray-900 dark:text-white"
                                                  : "text-gray-600 dark:text-gray-400"
                                              }`}
                                            >
                                              {lecture.title}
                                            </span>
                                            {lecture.isPreview && (
                                              <Badge
                                                variant="outline"
                                                className="ml-2 text-xs text-[rgb(37,150,190)] border-[rgb(37,150,190)]"
                                              >
                                                Preview
                                              </Badge>
                                            )}
                                          </div>
                                          <div className="flex items-center">
                                            <Badge
                                              variant="outline"
                                              className={`mr-3 text-xs ${
                                                lecture.type === "video"
                                                  ? "text-blue-500 border-blue-500"
                                                  : lecture.type === "quiz"
                                                  ? "text-purple-500 border-purple-500"
                                                  : lecture.type === "project"
                                                  ? "text-green-500 border-green-500"
                                                  : "text-amber-500 border-amber-500"
                                              }`}
                                            >
                                              {lecture.type
                                                .charAt(0)
                                                .toUpperCase() +
                                                lecture.type.slice(1)}
                                            </Badge>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                              {lecture.duration}
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Instructor Tab */}
                  <TabsContent value="instructor" className="mt-6">
                    <div className="bg-white dark:bg-[#1a2342] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 flex flex-col items-center">
                          <Avatar className="h-32 w-32 mb-4">
                            <AvatarImage
                              src={courseData.instructor.image}
                              alt={courseData.instructor.name}
                            />
                            <AvatarFallback>
                              {courseData.instructor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                              {courseData.instructor.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {courseData.instructor.title}
                            </p>
                          </div>
                        </div>

                        <div className="md:w-3/4">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <div className="text-xl font-bold text-[rgb(37,150,190)]">
                                {courseData.instructor.coursesCount}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Courses
                              </div>
                            </div>

                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <div className="text-xl font-bold text-[rgb(37,150,190)]">
                                {(
                                  courseData.instructor.studentsCount / 1000
                                ).toFixed(0)}
                                K+
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Students
                              </div>
                            </div>

                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <div className="text-xl font-bold text-[rgb(37,150,190)]">
                                {courseData.instructor.reviewsAverage}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Rating
                              </div>
                            </div>
                          </div>

                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300">
                              {courseData.instructor.bio}
                            </p>
                          </div>

                          <Button variant="outline" className="mt-6" asChild>
                            <Link
                              href={`/instructor/${courseData.instructor.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              View Full Profile
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Reviews Tab */}
                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-8">
                      {/* Rating Overview */}
                      <div className="bg-white dark:bg-[#1a2342] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3 flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                              {courseData.rating}
                            </div>
                            <div className="flex mb-2">
                              {renderStars(courseData.rating, "md")}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Course Rating • {courseData.reviewCount} Reviews
                            </div>
                          </div>

                          <div className="md:w-2/3">
                            <div className="space-y-2">
                              {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center">
                                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                                    {star} stars
                                  </div>
                                  <div className="w-full mx-3">
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-[rgb(37,150,190)]"
                                        style={{
                                          width: `${
                                            ratingDistribution[5 - star]
                                          }%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="w-12 text-right text-sm text-gray-600 dark:text-gray-400">
                                    {ratingDistribution[5 - star]}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reviews List */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Student Reviews
                        </h3>

                        <div className="space-y-6">
                          {courseData.reviews
                            .slice(0, showMore ? courseData.reviews.length : 3)
                            .map((review) => (
                              <div
                                key={review.id}
                                className="bg-white dark:bg-[#1a2342] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
                              >
                                <div className="flex items-start">
                                  <Avatar className="h-10 w-10 mr-4">
                                    <AvatarImage
                                      src={review.image}
                                      alt={review.name}
                                    />
                                    <AvatarFallback>
                                      {review.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                          {review.name}
                                        </h4>
                                        <div className="flex items-center mt-1">
                                          <div className="flex mr-2">
                                            {renderStars(review.rating)}
                                          </div>
                                          <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {review.date}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                                      {review.comment}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {courseData.reviews.length > 3 && (
                          <Button
                            variant="outline"
                            className="mt-6 mx-auto block"
                            onClick={() => setShowMore(!showMore)}
                          >
                            {showMore ? "Show Less" : "Show More Reviews"}
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform ${
                                showMore ? "transform rotate-180" : ""
                              }`}
                            />
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Related Courses */}
              <div className="lg:w-4/12">
                <div className="sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Courses
                  </h3>

                  <div className="space-y-4">
                    {courseData.relatedCourses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/${course.id}`}
                        className="block bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                      >
                        <div className="flex">
                          <div className="w-1/3 relative">
                            <Image
                              src={"/c.jpg"}
                              alt={course.title}
                              width={200}
                              height={120}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                              {course.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {course.instructor}
                            </p>
                            <div className="flex items-center mb-2">
                              <div className="flex mr-1">
                                {renderStars(course.rating)}
                              </div>
                              <span className="text-xs text-[rgb(37,150,190)]">
                                {course.rating}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                ({course.reviewCount})
                              </span>
                            </div>
                            <div className="flex items-center">
                              {course.discountPrice ? (
                                <>
                                  <span className="text-sm font-medium text-[rgb(37,150,190)]">
                                    ${course.discountPrice}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 line-through ml-1">
                                    ${course.price}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm font-medium text-[rgb(37,150,190)]">
                                  ${course.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
