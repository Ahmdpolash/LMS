import Link from "next/link";
import { Phone, Mail, MapPin, Youtube, Instagram, Github } from "lucide-react";
import Container from "../shared/Container";
import { footerData } from "@/constant";

export default function Footer() {
  return (
    <footer className="dark:bg-gradient-to-b overflow-auto dark:from-gray-900 dark:to-black text-white py-10 border-t border-gray-800">
      <Container>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer *:text-black dark:*:text-white">
            {/* About Column */}
            <div >
              <h3 className="text-xl font-semibold mb-6">About</h3>
              <ul className="space-y-2 lg:space-y-4 list-none ">
                {footerData?.about?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="dark:text-gray-300 hover:text-[rgb(37,150,190)] transition-colors text-black"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-2 lg:space-y-4 list-none">
                {footerData?.quickLinks?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="dark:text-gray-300 hover:text-[rgb(37,150,190)] transition-colors text-black"

                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Social Links</h3>
              <ul className="space-y-2 lg:space-y-4 list-none">
                {footerData?.socialLinks?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="dark:text-gray-300 hover:text-[rgb(37,150,190)] transition-colors text-black"

                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-2 lg:space-y-4 list-none">
                {footerData?.contactInfo?.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col lg:flex-row items-center space-x-2"
                  >
                    <span className="dark:text-gray-300 hover:text-[rgb(37,150,190)] transition-colors text-black">
                      {item.label} :
                    </span>
                    <span className="dark:text-gray-300 hover:text-[rgb(37,150,190)] transition-colors text-black">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 mb-5 lg:mb-0 pt-8 text-center dark:text-gray-400 text-black">
            Copyright © 2025 ELearning | All Rights Reserved
          </div>
        </div>
      </Container>
    </footer>
  );
}
