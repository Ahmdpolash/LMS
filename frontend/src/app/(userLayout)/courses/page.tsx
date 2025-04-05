"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Star,
  Search,
  Filter,
  BookOpen,
  Users,
  ArrowRight,
  X,
  SlidersHorizontal,
} from "lucide-react";
import Container from "@/components/shared/Container";
import { courses } from "@/constant";
import { BlurFade } from "@/components/magicui/blur-fade";
import { motion } from "framer-motion";
interface Course {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountPrice?: number; 
  students: number;
  lectures: number;
  category: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  description: string;
  tags: string[];
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // In a real app, this would be a fetch call to your API
  const coursesData: Course[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.8,
      reviewCount: 2547,
      originalPrice: 99.99,
      discountPrice: 84.99,
      students: 15420,
      lectures: 142,
      category: "Web Development",
      instructor: "Sarah Johnson",
      level: "All Levels",
      description:
        "Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more.",
      tags: ["html", "css", "javascript", "react", "node.js"],
    },
    {
      id: 2,
      title: "Data Science & Machine Learning Fundamentals",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 1832,
      originalPrice: 129.99,
      discountPrice: 89.99,
      students: 12350,
      lectures: 98,
      category: "Data Science",
      instructor: "Michael Chen",
      level: "Intermediate",
      description:
        "Master the fundamentals of data science and machine learning. Learn Python, pandas, NumPy, scikit-learn, and TensorFlow.",
      tags: ["python", "data science", "machine learning", "tensorflow"],
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.7,
      reviewCount: 1245,
      originalPrice: 89.99,
      discountPrice: 69.99,
      students: 8750,
      lectures: 86,
      category: "Design",
      instructor: "Emma Rodriguez",
      level: "Beginner",
      description:
        "Learn UI/UX design principles and create stunning user interfaces. Master Figma, Adobe XD, and design thinking.",
      tags: ["ui", "ux", "figma", "design"],
    },
    {
      id: 4,
      title: "Advanced JavaScript: From Fundamentals to Mastery",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 2103,
      originalPrice: 109.99,
      students: 10840,
      lectures: 124,
      category: "Programming",
      instructor: "David Wilson",
      level: "Advanced",
      description:
        "Take your JavaScript skills to the next level. Learn advanced concepts like closures, prototypes, async/await, and more.",
      tags: ["javascript", "es6", "node.js", "programming"],
    },
    {
      id: 5,
      title: "Digital Marketing Strategy & Social Media",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.6,
      reviewCount: 987,
      originalPrice: 79.99,
      discountPrice: 59.99,
      students: 7650,
      lectures: 78,
      category: "Marketing",
      instructor: "Sophia Martinez",
      level: "All Levels",
      description:
        "Master digital marketing strategies and social media campaigns. Learn SEO, content marketing, and analytics.",
      tags: ["marketing", "social media", "seo", "analytics"],
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.8,
      reviewCount: 1456,
      originalPrice: 119.99,
      discountPrice: 94.99,
      students: 9320,
      lectures: 112,
      category: "Mobile Development",
      instructor: "James Taylor",
      level: "Intermediate",
      description:
        "Build cross-platform mobile apps with React Native. Create iOS and Android apps with a single codebase.",
      tags: ["react native", "mobile", "javascript", "ios", "android"],
    },
    {
      id: 7,
      title: "Photography Fundamentals: From Beginner to Pro",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.7,
      reviewCount: 1123,
      originalPrice: 69.99,
      discountPrice: 49.99,
      students: 6840,
      lectures: 65,
      category: "Photography",
      instructor: "Alex Johnson",
      level: "Beginner",
      description:
        "Learn photography basics and advanced techniques. Master composition, lighting, and post-processing.",
      tags: ["photography", "lightroom", "composition", "editing"],
    },
    {
      id: 8,
      title: "Business Analytics & Data Visualization",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.8,
      reviewCount: 876,
      originalPrice: 89.99,
      students: 5430,
      lectures: 92,
      category: "Business",
      instructor: "Robert Chen",
      level: "Intermediate",
      description:
        "Learn how to analyze business data and create compelling visualizations. Master Excel, Tableau, and Power BI.",
      tags: ["analytics", "tableau", "excel", "data visualization"],
    },
    {
      id: 9,
      title: "Music Production Masterclass",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 1567,
      originalPrice: 99.99,
      discountPrice: 79.99,
      students: 8920,
      lectures: 104,
      category: "Music",
      instructor: "Lisa Williams",
      level: "All Levels",
      description:
        "Learn music production from scratch. Master DAWs, mixing, mastering, and sound design.",
      tags: ["music", "production", "mixing", "mastering"],
    },
    {
      id: 10,
      title: "Graphic Design for Beginners",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.6,
      reviewCount: 932,
      originalPrice: 69.99,
      discountPrice: 54.99,
      students: 7120,
      lectures: 76,
      category: "Design",
      instructor: "Mark Thompson",
      level: "Beginner",
      description:
        "Learn graphic design principles and tools. Master Adobe Photoshop, Illustrator, and InDesign.",
      tags: ["graphic design", "photoshop", "illustrator", "design"],
    },
    {
      id: 11,
      title: "Artificial Intelligence: Deep Learning Fundamentals",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.9,
      reviewCount: 1245,
      originalPrice: 149.99,
      discountPrice: 119.99,
      students: 6540,
      lectures: 88,
      category: "Data Science",
      instructor: "Dr. Alan Zhang",
      level: "Advanced",
      description:
        "Dive into deep learning and neural networks. Build AI models with PyTorch and TensorFlow.",
      tags: ["ai", "deep learning", "neural networks", "python"],
    },
    {
      id: 12,
      title: "Spanish for Beginners: Complete Course",
      image: "/placeholder.svg?height=200&width=350",
      rating: 4.7,
      reviewCount: 2156,
      originalPrice: 59.99,
      discountPrice: 39.99,
      students: 14560,
      lectures: 110,
      category: "Languages",
      instructor: "Maria Garcia",
      level: "Beginner",
      description:
        "Learn Spanish from scratch. Master vocabulary, grammar, and conversation skills.",
      tags: ["spanish", "language", "beginner", "conversation"],
    },
  ];

  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Toggle level selection
  const toggleLevel = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((l) => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  // Get unique categories from courses
  const categories = [...new Set(courses.map((course) => course.category))];

  // Get unique levels from courses
  const levels = [...new Set(courses.map((course) => course.level))];

  return (
    <div className="min-h-screen font-poppins">
      <div className="bg-white dark:bg-[#0C111B] min-h-screen transition-colors duration-200">
        {/* Header */}
        <div className="dark:bg-gradient-to-r from-[#151f38] to-[#1a2342] py-16 relative overflow-hidden border-b border-gray-400 dark:border-gray-600">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                Expand Your Skills
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                Explore Our Courses
              </h1>
              <p className="text-slate-800 dark:text-gray-300 text-lg mb-8">
                Discover courses taught by industry experts and take your skills
                to the next level
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  className="pl-12 py-6 bg-white/10 backdrop-blur-sm border-gray-600 text-white rounded-lg focus:ring-[rgb(37,150,190)] focus:border-[rgb(37,150,190)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>

        <Container>
          <main className="container mx-auto  py-12">
            {/* Filters and Sorting */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <Button
                  variant="outline"
                  className="mr-2 border-gray-300 dark:border-gray-700"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Selected filters */}
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {category}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleCategory(category)}
                      />
                    </Badge>
                  ))}

                  {selectedLevels.map((level) => (
                    <Badge
                      key={level}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {level}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleLevel(level)}
                      />
                    </Badge>
                  ))}

                  {(selectedCategories.length > 0 ||
                    selectedLevels.length > 0 ||
                    ratingFilter ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 200) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[rgb(37,150,190)] hover:text-[rgb(37,150,190)]/80"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <select
                  className="bg-transparent border-none text-slate-700 dark:text-slate-300 dark:*:text-black focus:outline-none focus:ring-0"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white dark:bg-[#1a2342] p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Level
                    </h3>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center">
                          <Checkbox
                            id={`level-${level}`}
                            checked={selectedLevels.includes(level)}
                            onCheckedChange={() => toggleLevel(level)}
                          />
                          <label
                            htmlFor={`level-${level}`}
                            className="ml-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Price Range
                    </h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={1}
                        value={priceRange}
                        onValueChange={(value) =>
                          setPriceRange(value as [number, number])
                        }
                        className="mb-6"
                      />
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4 mt-8">
                      Rating
                    </h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={ratingFilter === rating}
                            onCheckedChange={() =>
                              setRatingFilter(
                                ratingFilter === rating ? null : rating
                              )
                            }
                          />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="ml-2 flex items-center cursor-pointer"
                          >
                            <div className="flex mr-1">
                              {Array(rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              {Array(5 - rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 text-gray-300"
                                  />
                                ))}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                              & up
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {filteredCourses.length}
                </span>{" "}
                courses
              </p>
            </div>

            {/* Course Grid */}
            {courses.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 flex flex-col h-[500px]"
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden">
                      <BlurFade
                        key={course.image}
                        delay={0.25 + 1 * 0.05}
                        inView
                      >
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={350}
                          height={200}
                          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </BlurFade>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[rgb(37,150,190)] text-white">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gray-900/80 text-white">
                          {course.level}
                        </Badge>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      {/* Instructor */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        By {course.instructor}
                      </p>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {course.lectures}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex mr-2">
                          {renderStars(course.rating)}
                        </div>
                        <span className="text-[rgb(37,150,190)] font-medium">
                          {course.rating}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                          ({course.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Price and Stats */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            {course.discountPrice ? (
                              <div className="flex items-center">
                                <span className="text-[rgb(37,150,190)] font-bold text-xl">
                                  ${course.discountPrice}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 line-through ml-2">
                                  ${course.originalPrice}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[rgb(37,150,190)] font-bold text-xl">
                                ${course.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Students & Lectures */}
                          <div className="text-right">
                            <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{course.students.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm mt-1">
                              <BookOpen className="h-4 w-4 mr-1" />
                              <span>{course.lectures} lectures</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="mt-4">
                        <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 dark:bg-[#1a2342]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="border-[rgb(37,150,190)] text-[rgb(37,150,190)]"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="w-8 h-8 p-0">
                    <span className="sr-only">Go to previous page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 min-w-8 px-3 bg-[rgb(37,150,190)] text-white"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 min-w-8 px-3"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 min-w-8 px-3"
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 min-w-8 px-3"
                  >
                    ...
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 min-w-8 px-3"
                  >
                    8
                  </Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 p-0">
                    <span className="sr-only">Go to next page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </main>
        </Container>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#151f38] to-[#1a2342] py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Not Sure Where to Start?
              </h2>
              <p className="text-gray-300 mb-6">
                Take our quick assessment to get personalized course
                recommendations based on your goals and skill level.
              </p>
              <Button className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
                Take Skill Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
