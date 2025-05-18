"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseData } from "@/constant/coursemockdata";
import { Check, ChevronDown, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { renderStars } from "./RenderStar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const TabsSection = ({ courseInfo }: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [groupedCourseData, setGroupedCourseData] = useState<any>();
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);

  useEffect(() => {
    if (courseInfo?.courseData) {
      const sections: { [key: string]: any[] } = {};
      const order: string[] = [];
      courseInfo.courseData.forEach((video: any) => {
        if (sections[video.videoSection]) {
          sections[video.videoSection].push(video);
        } else {
          sections[video.videoSection] = [video];
          order.push(video.videoSection); // Maintain the order of appearance
        }
      });
      setGroupedCourseData(sections);
      setSectionOrder(order);
    }
  }, [courseInfo?.courseData]);

  const toggleSection = (sectionName: string) => {
    if (expandedSections.includes(sectionName)) {
      setExpandedSections(
        expandedSections.filter((item) => item !== sectionName)
      );
    } else {
      setExpandedSections([...expandedSections, sectionName]);
    }
  };

  // Toggle curriculum section
  // const toggleSection = (sectionIndex: number) => {
  //   if (expandedSections.includes(sectionIndex)) {
  //     setExpandedSections(expandedSections.filter((i) => i !== sectionIndex));
  //   } else {
  //     setExpandedSections([...expandedSections, sectionIndex]);
  //   }
  // };

  // Calculate rating distribution
  const ratingDistribution = [85, 10, 3, 1, 1]; // Percentage of 5, 4, 3, 2, 1 star reviews

  return (
    <div>
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="w-full grid grid-cols-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1">
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
                  __html: courseInfo?.description,
                }}
              />
            </div>

            {/* What You'll Learn */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {courseInfo?.benefits.map(
                  (item: { title: string }, index: number) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[rgb(37,150,190)] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {item?.title}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Requirements
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {courseInfo?.prerequisites?.map(
                  (item: { title: string }, index: number) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {item?.title}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Target Audience */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Who This Course is For
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-700 dark:text-gray-300">
                  Anyone who wants to become a full-stack web developer.
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  Programmers from other languages who want to learn web
                  development.
                </li>
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
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionName, sectionIndex) => (
                <div
                  key={sectionIndex} // Use sectionName as the key
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 text-left"
                    onClick={() => toggleSection(sectionName)}
                  >
                    <div className="flex items-center">
                      <ChevronDown
                        className={`h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 transition-transform ${
                          expandedSections.includes(sectionName)
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {sectionName}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {groupedCourseData[sectionName].length} lectures •{" "}
                      {groupedCourseData[sectionName].reduce(
                        (sum: any, video: any) => sum + video.videoLength,
                        0
                      )}{" "}
                      min
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(sectionName) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                          {groupedCourseData[sectionName].map((video: any) => (
                            <div
                              key={video._id}
                              className="flex justify-between items-center py-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-lg px-2"
                            >
                              <div className="flex items-center">
                                <Lock className="h-4 w-4 text-gray-400 mr-3" />
                                <span
                                  className={`text-gray-600 dark:text-gray-400`}
                                >
                                  {video.title}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className={`"text-green-500 border-green-500"`}
                                >
                                  {/* You might want to display a "Free" or other status here */}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {video.videoLength} min
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
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
                                width: `${ratingDistribution[5 - star]}%`,
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
                            src={courseInfo?.thumbnail?.url}
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
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
