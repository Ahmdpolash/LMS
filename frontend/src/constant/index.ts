import { ICourse } from "@/types";
import { Github, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import {
  ChartLine,
  Cog,
  LayoutDashboard,
  SquarePlay,
  UserCog,
  Users,
} from "lucide-react";
export const NavItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "About",
    path: "/about-us",
  },
  {
    name: "Policy",
    path: "/policy",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
];

export const AdminSidebarItem = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },

    {
      title: "Data",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/admin/users",
        },

        {
          title: "Invoices",
          url: "/admin/invoices",
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      icon: SquarePlay,
      isActive: true,
      items: [
        {
          title: "All Courses",
          url: "/admin/courses",
        },
        {
          title: "Create Course",
          url: "/admin/create-course",
        },
      ],
    },
    {
      title: "Customization",
      url: "#",
      icon: Cog,
      isActive: true,
      items: [
        {
          title: "Add Banner",
          url: "/admin/banner",
        },

        {
          title: "Add Category",
          url: "/admin/add-category",
        },
        {
          title: "Add FAQ",
          url: "/admin/add-faq",
        },
      ],
    },
    {
      title: "Controllers",
      url: "#",
      icon: UserCog,
      isActive: true,
      items: [
        {
          title: "Manage Team",
          url: "/admin/manage-team",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
      isActive: false,
      items: [
        {
          title: "Users Analytics",
          url: "/admin/user-analytics",
        },
        {
          title: "Course Analytics",
          url: "/admin/course-analytics",
        },
        {
          title: "Orders Analytics",
          url: "/admin/course-analytics",
        },
      ],
    },
  ],
};

export const footerData = {
  about: [
    { name: "Our Story", path: "/about-us" },
    { name: "Privacy Policy", path: "/policy" },
    { name: "FAQ", path: "/faq" },
  ],
  quickLinks: [
    { name: "Courses", path: "/courses" },
    { name: "My Account", path: "/my-account" },
    { name: "Course Dashboard", path: "/course-dashboard" },
  ],
  socialLinks: [
    {
      name: "Facebook",
      path: "https://www.facebook.com/polashahmeddev",
      icon: Youtube,
    },
    {
      name: "Linkedin",
      path: "https://www.linkedin.com/in/polashahmed",
      icon: Instagram,
    },
    { name: "Github", path: "https://github.com/Ahmdpolash", icon: Github },
  ],
  contactInfo: [
    { label: "Call Us", value: "+8801756213028", icon: Phone },
    {
      label: "Address",
      value: "Kurigram,Bangladesh",
      icon: MapPin,
    },
    { label: "Mail", value: "ahmedpolash732@gmail.com", icon: Mail },
  ],
  copyright: "Copyright © 2023 ELearning | All Rights Reserved",
};

export const avatars = [
  {
    imageUrl:
      "https://img.freepik.com/free-photo/porait-cute-boy-cafe_23-2148436119.jpg?semt=ais_hybrid&w=740",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
    profileUrl: "https://github.com/BankkRoll",
  },
];

export const teamMembers = [
  {
    name: "Polash Ahmed",
    role: "Founder & CEO - ELearning",
    image: "/p.png",
    bio: "Former education technology executive with a passion for making quality education accessible to everyone.",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "/i1.webp",
    bio: "Tech innovator with 15+ years of experience building scalable platforms and AI-driven learning systems.",
  },
  {
    name: "Emma Rodriguez",
    role: "Head of Content",
    image: "/i2.jpg",
    bio: "Curriculum development expert who has designed courses for leading universities and corporations.",
  },
  {
    name: "David Wilson",
    role: "Chief Marketing Officer",
    image: "/i3.jpeg",

    bio: "Digital marketing strategist who previously led growth at several successful EdTech startups.",
  },
];

export const courses: ICourse[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    image: "/c.jpg",
    rating: 4.8,
    reviewCount: 2547,
    originalPrice: 99.99,
    discountPrice: 84.99,
    students: 15420,
    lectures: 142,
    category: "Web Development",
    instructor: "Sarah Johnson",
    level: "All Levels",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    image: "/c.jpg",

    rating: 4.9,
    reviewCount: 1832,
    originalPrice: 129.99,
    discountPrice: 89.99,
    students: 12350,
    lectures: 98,
    category: "Data Science",
    instructor: "Michael Chen",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    image: "/c.jpg",

    rating: 4.7,
    reviewCount: 1245,
    originalPrice: 89.99,
    discountPrice: 69.99,
    students: 8750,
    lectures: 86,
    category: "Design",
    instructor: "Emma Rodriguez",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Advanced JavaScript: From Fundamentals to Mastery",
    image: "/c.jpg",

    rating: 4.9,
    reviewCount: 2103,
    originalPrice: 109.99,
    students: 10840,
    lectures: 124,
    category: "Programming",
    instructor: "David Wilson",
    level: "Advanced",
  },
  {
    id: 5,
    title: "Digital Marketing Strategy & Social Media",
    image: "/c.jpg",

    rating: 4.6,
    reviewCount: 987,
    originalPrice: 79.99,
    discountPrice: 59.99,
    students: 7650,
    lectures: 78,
    category: "Marketing",
    instructor: "Sophia Martinez",
    level: "All Levels",
  },
  {
    id: 6,
    title: "Mobile App Development with React Native",
    image: "/c.jpg",

    rating: 4.8,
    reviewCount: 1456,
    originalPrice: 119.99,
    discountPrice: 94.99,
    students: 9320,
    lectures: 112,
    category: "Mobile Development",
    instructor: "James Taylor",
    level: "Intermediate",
  },
];
