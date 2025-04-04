import { Github, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

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

export const footerData = {
  about: [
    { name: "Our Story", path: "/our-story" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "FAQ", path: "/faq" },
  ],
  quickLinks: [
    { name: "Courses", path: "/courses" },
    { name: "My Account", path: "/my-account" },
    { name: "Course Dashboard", path: "/course-dashboard" },
  ],
  socialLinks: [
    { name: "Youtube", path: "https://youtube.com", icon: Youtube },
    { name: "Instagram", path: "https://instagram.com", icon: Instagram },
    { name: "Github", path: "https://github.com", icon: Github },
  ],
  contactInfo: [
    { label: "Call Us", value: "+8801756213028", icon: Phone },
    {
      label: "Address",
      value: "Kurigram,Bangladesh",
      icon: MapPin,
    },
    { label: "Mail Us", value: "ahmedpolash732@gmail.com", icon: Mail },
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
