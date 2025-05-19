import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lock, Play, Video } from "lucide-react";
import { useState } from "react";

type TProps = {
  groupedData: { [key: string]: any[] };
  sectionOrder: string[];
  allContent: any[];
  activeVideo: number;
  setActiveVideo: (activevideo: number) => void;
};

const ModuleSidebar = ({
  groupedData,
  sectionOrder,
  allContent,
  activeVideo,
  setActiveVideo,
}: TProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
    if (expandedSections.includes(sectionName)) {
      setExpandedSections(
        expandedSections.filter((item) => item !== sectionName)
      );
    } else {
      setExpandedSections([...expandedSections, sectionName]);
    }
  };

  return (
    <div>
      {/* {sectionOrder.map((sectionName) => (
        <div key={sectionName}>
          <h3>{sectionName}</h3>
          <ul>
            {groupedData[sectionName]?.map((video: any) => (
              <li className="cursor-pointer" onClick={() => setActiveVideo(allContent.indexOf(video))} key={video._id}>{video.title}</li>
            ))}
          </ul>
        </div>
      ))} */}

      <div className="space-y-4 bg-gray-200 shadow-m dark:bg-[#131320] p-4 rounded-md">
        {sectionOrder.map((sectionName, sectionIndex) => (
          <div
            key={sectionIndex} // Use sectionName as the key
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 text-left cursor-pointer"
              onClick={() => toggleSection(sectionName)}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-gray-900 dark:text-white">
                  Module {sectionIndex + 1} : {sectionName}
                </span>
                <ChevronDown
                  className={`h-5 w-5 justify-end items-end mr-2 text-white font-bold transition-transform ${
                    expandedSections.includes(sectionName)
                      ? "transform rotate-180 font-bold"
                      : ""
                  }`}
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {groupedData[sectionName].length} lectures •{" "}
                {groupedData[sectionName].reduce(
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
                    {groupedData[sectionName].map((video: any) => (
                      <div
                        key={video._id}
                        className={`flex justify-between items-center py-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-lg px-2 cursor-pointer ${
                          activeVideo === allContent.indexOf(video)
                            ? "bg-gray-50 dark:bg-gray-800/50 "
                            : ""
                        }`}
                        onClick={() =>
                          setActiveVideo(allContent.indexOf(video))
                        }
                      >
                        <div className="flex items-center">
                          {activeVideo !== allContent.indexOf(video) ? (
                            <Lock className="h-4 w-4 text-gray-400 mr-3" />
                          ) : (
                            <Play className="h-4 w-4 text-gray-400 mr-3" />
                          )}

                          <span className={`text-gray-600 dark:text-gray-400`}>
                            {video.title}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Badge className="mr-2">video</Badge>

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
  );
};

export default ModuleSidebar;
