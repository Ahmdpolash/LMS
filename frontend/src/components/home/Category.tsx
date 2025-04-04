import type React from "react";
import {
  Code,
  PenTool,
  BarChart3,
  ShoppingBag,
  Camera,
  Music,
  BookOpen,
  Languages,
  HeartPulse,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Container from "../shared/Container";

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

export default function CategorySection() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Web Development",
      icon: <Code />,
      count: 120,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      id: 2,
      name: "Graphic Design",
      icon: <PenTool />,
      count: 85,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      id: 3,
      name: "Marketing",
      icon: <BarChart3 />,
      count: 65,
      color: "bg-green-500/20 text-green-400",
    },
    {
      id: 4,
      name: "Business",
      icon: <Briefcase />,
      count: 92,
      color: "bg-amber-500/20 text-amber-400",
    },
    {
      id: 5,
      name: "Photography",
      icon: <Camera />,
      count: 43,
      color: "bg-pink-500/20 text-pink-400",
    },
    {
      id: 6,
      name: "Music",
      icon: <Music />,
      count: 38,
      color: "bg-red-500/20 text-red-400",
    },
    {
      id: 7,
      name: "Academic",
      icon: <BookOpen />,
      count: 74,
      color: "bg-teal-500/20 text-teal-400",
    },
    {
      id: 8,
      name: "Languages",
      icon: <Languages />,
      count: 51,
      color: "bg-indigo-500/20 text-indigo-400",
    },
    {
      id: 9,
      name: "Health & Fitness",
      icon: <HeartPulse />,
      count: 47,
      color: "bg-rose-500/20 text-rose-400",
    },
    {
      id: 10,
      name: "E-Commerce",
      icon: <ShoppingBag />,
      count: 36,
      color: "bg-orange-500/20 text-orange-400",
    },
  ];

  return (
    <div className="border-b border-gray-400 dark:border-gray-700">
      <Container>
        <section className="py-16">
          <div className="container mx-auto ">
            <div className="text-center mb-12">
              <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
                Explore Categories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
                  Browse Top Categories
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover courses in various fields to enhance your skills and
                advance your career
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/category/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="bg-white h-[160px] dark:bg-[#1a2342] rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border border-gray-100 dark:border-gray-800"
                >
                  <div
                    className={`${category.color} p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <h1 className="font-medium text-gray-900 dark:text-white mb-1">
                    {category.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} courses
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
