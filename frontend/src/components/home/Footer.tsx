import Link from "next/link";
import { Phone, Mail, MapPin, Youtube, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C111B] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">About</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/our-story"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/my-account"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Social Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://youtube.com"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors flex items-center gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors flex items-center gap-2"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  className="text-gray-300 hover:text-[rgb(37,150,190)] transition-colors flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  github
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 text-[rgb(37,150,190)]" />
                <span>Call Us: 1-885-665-2022</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 text-[rgb(37,150,190)]" />
                <span>Address: +7011 Vermont Ave, Los Angeles, CA 90044</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 text-[rgb(37,150,190)]" />
                <span>Mail Us: hello@elearning.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          Copyright © 2023 ELearning | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
