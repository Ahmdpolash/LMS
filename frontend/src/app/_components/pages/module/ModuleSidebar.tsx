import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Circle, Play, Video } from "lucide-react";
import { useEffect, useState } from "react";

type TProps = {
  groupedData: { [key: string]: any[] };
  sectionOrder: string[];
  allContent: any[];
  activeVideo: number;
  setActiveVideo: (activevideo: number) => void;
  completedLessons?: string[];
  onToggleLesson?: (lessonId: string) => void;
};

const ModuleSidebar = ({
  groupedData,
  sectionOrder,
  allContent,
  activeVideo,
  setActiveVideo,
  completedLessons = [],
  onToggleLesson,
}: TProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Expand all sections by default when sectionOrder loads
  useEffect(() => {
    if (sectionOrder.length > 0 && expandedSections.length === 0) {
      setExpandedSections(sectionOrder);
    }
  }, [sectionOrder]);

  const toggleSection = (sectionName: string) => {
    if (expandedSections.includes(sectionName)) {
      setExpandedSections(
        expandedSections.filter((item) => item !== sectionName)
      );
    } else {
      setExpandedSections([...expandedSections, sectionName]);
    }
  };

  const totalLessons = allContent?.length || 0;
  const completedCount = allContent?.filter((v) =>
    completedLessons?.includes(v._id)
  ).length || 0;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="sticky top-20 ">
      {/* Course Progress Header */}
      <div className="bg-gray-200 dark:bg-[#131320] p-4 rounded-lg mb-4 border border-gray-300 dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
          <span className="text-gray-900 dark:text-white">Course Progress</span>
          <span className="text-blue-600 dark:text-purple-400 font-bold">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5">
          {completedCount} of {totalLessons} lectures completed
        </p>
      </div>

      <div className="space-y-4 bg-gray-200 shadow-m dark:bg-[#131320] p-4 rounded-md ">
        {sectionOrder.map((sectionName, sectionIndex) => (
          <div
            key={sectionIndex}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 text-left cursor-pointer"
              onClick={() => toggleSection(sectionName)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">
                  Module {sectionIndex + 1} : {sectionName}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-700 dark:text-white font-bold transition-transform ${
                    expandedSections.includes(sectionName)
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {groupedData[sectionName]?.length} lectures •{" "}
                {groupedData[sectionName]?.reduce(
                  (sum: any, video: any) => sum + (video.videoLength || 0),
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
                  <div className="p-3 space-y-1.5 border-t border-gray-200 dark:border-gray-700">
                    {groupedData[sectionName]?.map((video: any) => {
                      const videoIndex = allContent.indexOf(video);
                      const isCurrent = activeVideo === videoIndex;
                      const isCompleted = completedLessons.includes(video._id);

                      return (
                        <div
                          key={video._id}
                          className={`flex justify-between items-center py-2.5 px-3 rounded-lg cursor-pointer transition-colors ${
                            isCurrent
                              ? "bg-blue-100 dark:bg-gray-800/70 border-l-4 border-blue-500"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                          }`}
                          onClick={() => setActiveVideo(videoIndex)}
                        >
                          <div className="flex items-center gap-2 flex-1 mr-2 min-w-0">
                            {/* Toggle Completion Button */}
                            <button
                              type="button"
                              title={
                                isCompleted
                                  ? "Mark as incomplete"
                                  : "Mark as completed"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onToggleLesson) {
                                  onToggleLesson(video._id);
                                }
                              }}
                              className="focus:outline-none shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 hover:text-emerald-600 transition-transform active:scale-95" />
                              ) : (
                                <Circle className="h-4 w-4 text-gray-400 hover:text-emerald-500 transition-colors" />
                              )}
                            </button>

                            {isCurrent && (
                              <Play className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            )}

                            <span
                              className={`text-sm truncate ${
                                isCompleted
                                  ? "text-gray-500 line-through dark:text-gray-400"
                                  : isCurrent
                                  ? "text-blue-600 dark:text-white font-medium"
                                  : "text-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {video.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {video.videoLength} min
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleSidebar;
