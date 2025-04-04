import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "../shared/Container";
import { AvatarCircles } from "../magicui/avatar-circles";
import { avatars } from "@/constant";
import Link from "next/link";

export default function CTASection() {
  return (
    <Container>
      <section className="py-16 relative overflow-hidden ">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[rgb(37,150,190)]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="   relative z-10">
          <div className="dark:bg-gradient-to-r from-[#151f38] to-[#1a2342] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-400 dark:border-gray-800/50 overflow-hidden relative">
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[rgb(37,150,190)]/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                  Ready to Start Your Learning Journey ?
                </h2>
                <p className="text-slate-600 dark:text-gray-300 text-lg mb-6">
                  Join over 500 learners who have advanced their careers with
                  our expert-led courses. Get unlimited access to our library of
                  20+ courses.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={"/sign-in"}>
                    <Button className="bg-[rgb(37,150,190)] cursor-pointer hover:bg-[rgb(37,150,190)]/80 text-white px-8 py-6 text-lg rounded-lg group transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(37,150,190)]/20">
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href={"/courses"}>
                    <Button
                      variant="outline"
                      className="border-gray-600 cursor-pointer text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 px-8 py-6 text-lg rounded-lg"
                    >
                      View All Courses
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <AvatarCircles avatarUrls={avatars} />
                  <p className="text-slate-700 dark:text-gray-300 text-sm">
                    Join 500+ satisfied learners
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="dark:bg-[#0C111B]/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
                  <h3 className="text-xl font-semibold text:black dark:text-white mb-4">
                    Course Benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-4 h-4 text-[rgb(37,150,190)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-slate-600 dark:text-gray-300">
                        Access to 10+ courses
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-4 h-4 text-[rgb(37,150,190)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-slate-600 dark:text-gray-300">
                        Expert instructors
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-4 h-4 text-[rgb(37,150,190)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-slate-600 dark:text-gray-300">
                        Lifetime access to course materials
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-4 h-4 text-[rgb(37,150,190)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-slate-600 dark:text-gray-300">
                        Certificates of completion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[rgb(37,150,190)]/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-4 h-4 text-[rgb(37,150,190)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-slate-600 dark:text-gray-300">
                        30-day money-back guarantee
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3">
                  <span className="font-bold">30% OFF</span> - Limited Time!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
