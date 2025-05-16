"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Award,
  Calendar,
  Check,
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
  SquarePlay,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
} from "@/redux/features/course/courseApi";

import { format } from "timeago.js";

import { courseData } from "@/constant/coursemockdata";
import TabsSection from "./TabsSection";
import { renderStars } from "./RenderStar";

import { motion } from "framer-motion";
import CustomLoading from "../../CustomLoading";
import ReactPlayer from "react-player";
import { useAppSelector } from "@/redux/hooks";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  useCreateStripePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/order/orderApi";
import CheckOutForm from "../payments/CheckOutForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCurrentUserQuery } from "@/redux/api/baseApi";

export default function CourseDetails({ slug }: { slug: string }) {
  const { data, isLoading } = useGetSingleCourseQuery(slug);
  const { data: allCourse } = useGetAllCoursesQuery({});
  const [courseInfo, setCurseInfo] = useState<any>();
  const { data: user } = useCurrentUserQuery({});
  const [open, setOpen] = useState(false);
  //set data on state
  useEffect(() => {
    if (data) {
      const updatedData = data?.data;
      setCurseInfo(updatedData);
    }
  }, [data]);

  const isPurchased =
    user &&
    user?.data?.courses?.find(
      (item: any) => item?.courseId === courseInfo?._id?.toString()
    );
  console.log(isPurchased, "isPurchased");
  console.log(courseInfo, "courseInfo");
  console.log(user, "user");

  // payment

  const { data: config } = useGetStripePublishableKeyQuery({});

  const [createPayment, { data: paymentInfo }] =
    useCreateStripePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<any>("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.data;

      setStripePromise(loadStripe(publishableKey));
    }

    if (courseInfo) {
      const amount = courseInfo?.price;

      createPayment(amount);
    }
  }, [config, courseInfo]);

  useEffect(() => {
    if (paymentInfo) {
      setClientSecret(paymentInfo?.client_secret);
    }
  }, [paymentInfo]);

  const handleOrder = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-7/12"
                  >
                    <div className="flex items-center mb-4">
                      <Badge className="bg-[rgb(37,150,190)] text-white mr-2">
                        Bestseller
                      </Badge>
                      <Badge
                        variant="outline"
                        className="dark:text-white border-gray-500"
                      >
                        {courseInfo?.level}
                      </Badge>
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white mb-4">
                      {courseInfo?.name}
                    </h1>

                    <p className="text-black dark:text-gray-300 text-[17px] mb-6">
                      {courseInfo?.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center *:text-black *:dark:text-white">
                        <div className="flex mr-2">
                          {renderStars(courseInfo?.ratings, "md")}
                        </div>
                        <span className="dark:text-[rgb(37,150,190)] font-medium">
                          {courseInfo?.ratings}
                        </span>
                        <span className="dark:text-gray-300 ml-1">
                          ({courseInfo?.reviews?.length} reviews)
                        </span>
                      </div>

                      <div className="flex items-center dark:text-gray-300">
                        <Users className="h-5 w-5 mr-1" />
                        <span>{courseInfo?.purchased} students</span>
                      </div>

                      <div className="flex items-center dark:text-gray-300">
                        <Calendar className="h-5 w-5 mr-1" />
                        <span>
                          Last updated {format(courseInfo?.updatedAt)}
                        </span>
                      </div>

                      <div className="flex items-center dark:text-gray-300">
                        <Globe className="h-5 w-5 mr-1" />
                        <span> {courseInfo?.language || "English"}</span>
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={"/logo2.png"} alt={"eLearning"} />
                        <AvatarFallback>ELearning</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="dark:text-white font-medium">
                          Created by
                        </p>
                        <Link
                          href={`/instructor/${courseData.instructor.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-[rgb(37,150,190)] hover:underline"
                        >
                          ELearning
                        </Link>
                      </div>
                    </div>
                    <div className=" py-4 text-white max-w-4xl mx-auto">
                      <h2 className="text-2xl font-semibold mb-2">
                        Welcome to ELearning Platform
                      </h2>
                      <p className="text-sm text-gray-300 mb-4">
                        Unlock your potential with our expertly crafted courses.
                        Whether you're just starting out or looking to sharpen
                        your skills, we've got something for everyone.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="bg-[#1f2937] p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">
                            What you'll learn
                          </h3>
                          <ul className="list-disc list-inside text-gray-400 mt-2 text-sm">
                            <li>Set up real-world projects</li>
                            <li>Understand core concepts of web development</li>
                            <li>Build responsive UIs</li>
                            <li>Deploy apps with ease</li>
                          </ul>
                        </div>
                        <div className="bg-[#1f2937] p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">
                            Why choose us?
                          </h3>
                          <ul className="list-disc list-inside text-gray-400 mt-2 text-sm">
                            <li>Expert instructors</li>
                            <li>Self-paced learning</li>
                            <li>Lifetime access to courses</li>
                            <li>Real-world project experience</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Course Preview Card */}
                  <div className="w-full lg:w-5/12">
                    <div className="bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                      {/* <div className="relative">
                        <Image
                          src={courseInfo?.thumbnail?.url || "/alt.jpg"}
                          alt="course image"
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
                      </div> */}
                      <ReactPlayer
                        url={courseInfo?.demoUrl}
                        controls
                        width="100%"
                        height="340px"
                        className="rounded-md"
                      />

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">
                              ${courseInfo?.price}
                            </span>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                              ${courseInfo?.estimatedPrice}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-red-500 border-red-500"
                          >
                            {Math.round(
                              (1 -
                                courseInfo?.price /
                                  courseInfo?.estimatedPrice) *
                                100
                            )}
                            % off
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Sale ends in 20 days!
                        </p>

                        {isPurchased ? (
                          <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white mb-3 cursor-pointer">
                            <SquarePlay  className="h-4 w-4 mr-2" />
                            Enter to Course
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={handleOrder}
                              className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white mb-3 cursor-pointer"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Enroll Now
                            </Button>

                            <Button
                              variant="outline"
                              className={` ${
                                courseInfo?.price !== 0
                                  ? "cursor-not-allowed disabled:"
                                  : ""
                              } w-full mb-6`}
                            >
                              Try For Free
                            </Button>
                          </>
                        )}

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
                              N/A
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">
                              <Layers className="h-4 w-4 inline mr-1" />
                              Lectures:
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {courseInfo?.courseData?.length}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">
                              <FileText className="h-4 w-4 inline mr-1" />
                              Articles:
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              0
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">
                              <Download className="h-4 w-4 inline mr-1" />
                              Resources:
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {courseInfo?.courseData?.length}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">
                              <Award className="h-4 w-4 inline mr-1" />
                              Certificate:
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              Yes, upon completion
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-700 dark:text-gray-300 cursor-pointer"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            Wishlist
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-700 dark:text-gray-300 cursor-pointer"
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
                    <TabsSection courseInfo={courseInfo} />
                  </div>

                  {/* Related Courses */}
                  <div className="lg:w-4/12">
                    <div className="sticky top-24">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Related Courses
                      </h3>

                      <div className="space-y-4">
                        {allCourse?.data?.slice(0, 4)?.map((course: any) => (
                          <Link
                            key={course._id}
                            href={`/courses/${course._id}`}
                            className="block bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                          >
                            <div className="flex">
                              <div className="w-1/3 relative">
                                <Image
                                  src={course?.thumbnail?.url}
                                  alt="course image"
                                  width={200}
                                  height={120}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="w-2/3 p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                                  {course?.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  ELearning Instructor
                                </p>
                                <div className="flex items-center mb-2">
                                  <div className="flex mr-1">
                                    {renderStars(course?.ratings)}
                                  </div>
                                  <span className="text-xs text-[rgb(37,150,190)]">
                                    {course?.ratings}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                    ({course?.reviews.length})
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  {course.estimatedPrice ? (
                                    <>
                                      <span className="text-sm font-medium text-[rgb(37,150,190)]">
                                        ${course.price}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400 line-through ml-1">
                                        ${course?.price}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-medium text-[rgb(37,150,190)]">
                                      ${course?.price}
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
      )}

      {open && (
        <div className="px-7 lg:px-0 w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[530px] bg-white rounded-xl shadow p-3">
            <div className="w-full flex justify-end">
              <IoMdCloseCircleOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} courseInfo={courseInfo} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
