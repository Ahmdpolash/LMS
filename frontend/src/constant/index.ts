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
    path: "/about",
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
    imageUrl: "https://img.freepik.com/free-photo/porait-cute-boy-cafe_23-2148436119.jpg?semt=ais_hybrid&w=740",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
    profileUrl: "https://github.com/BankkRoll",
  },
];
