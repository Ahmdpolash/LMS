import { useGetCourseContentQuery } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import CustomLoading from "../../CustomLoading";
import CourseContentMedia from "./CourseContentMedia";
import Container from "@/components/shared/Container";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  Bookmark,
  BookmarkCheck,
  CircleArrowLeft,
  FileSliders,
  Notebook,
} from "lucide-react";
import { toast } from "sonner";
import ModuleBottomTabs from "./ModuleBottomTabs";
import ModuleSidebar from "./ModuleSidebar";
import Loading from "@/app/(userLayout)/course-access/[id]/loading";

const MainCourseContent = ({ id, data }: { id: string; data: any }) => {
  const { data: courseContent, isLoading } = useGetCourseContentQuery(id);
  const allContent = courseContent?.data;
  const [activeVideo, setActiveVideo] = useState(0);
  const [mark, setMark] = useState(false);
  // grouping the video
  const [groupedCourseData, setGroupedCourseData] = useState<{
    [key: string]: any[];
  }>({});
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);

  useEffect(() => {
    if (allContent) {
      const sections: { [key: string]: any[] } = {};
      const order: string[] = [];
      allContent?.forEach((video: any) => {
        if (sections[video.videoSection]) {
          sections[video.videoSection].push(video);
        } else {
          sections[video.videoSection] = [video];
          order.push(video.videoSection);
        }
      });
      setGroupedCourseData(sections);
      setSectionOrder(order);
    }
  }, [allContent]);

  // button handler
  const goToPreviousVideo = () => {
    if (activeVideo > 0) {
      setActiveVideo(activeVideo - 1);
    }
  };

  const goToNextVideo = () => {
    if (allContent && activeVideo < allContent.length - 1) {
      setActiveVideo(activeVideo + 1);
    }
  };

  const handleBookMark = () => {
    setMark(!mark);
    toast.success("Added to bookmark");
  };

  const handleRemoveBookmark = () => {
    setMark(!mark);
    toast.success("Removed from bookmark");
  };

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="pb-3 mt-4 lg:mt-6 border-b w-full border-gray-400 dark:border-gray-700 flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <button className="cursor-pointer" onClick={goToPreviousVideo}>
                <CircleArrowLeft className="text-blue-500" />
              </button>
              <h3 className="text-[21px]  bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {activeVideo + 1}-
                {
                  groupedCourseData[allContent[activeVideo]?.videoSection]
                    ?.length
                }{" "}
                : {allContent[activeVideo]?.title}
              </h3>
            </div>
            <div className="flex items-center gap-5">
              <FileSliders
                onClick={() =>
                  toast.error("Note Feature Not Available Right Now !")
                }
                className="cursor-pointer"
              />
              {mark ? (
                <BookmarkCheck
                  onClick={handleRemoveBookmark}
                  className="cursor-pointer"
                />
              ) : (
                <Bookmark className="cursor-pointer" onClick={handleBookMark} />
              )}
            </div>
          </div>
          <div className=" grid grid-cols-11 gap-4 py-5 relative">
            <div className="col-span-11 lg:col-span-7">
              <CourseContentMedia
                groupedData={groupedCourseData}
                sectionOrder={sectionOrder}
                allContent={allContent}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
              {/* prev and next button */}
              <div className="w-full flex items-center justify-between my-3">
                <div
                  className={`bg-[#3084FF] flex items-center gap-2 rounded-full !min-h-[40px] !w-[unset] py-2 px-4 cursor-pointer ${
                    activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                  }`}
                  onClick={goToPreviousVideo}
                >
                  <AiOutlineArrowLeft className="mr-" />
                  Previous
                </div>
                <div
                  className={`bg-[#3084FF] flex items-center gap- rounded-full !min-h-[40px] !w-[unset] py-2 px-4 cursor-pointer ${
                    allContent?.length - 1 === activeVideo &&
                    "!cursor-no-drop opacity-[.8]"
                  }`}
                  onClick={goToNextVideo}
                >
                  Next
                  <AiOutlineArrowRight className="ml-2" />
                </div>
              </div>

              <div className="hidden lg:block">
                <ModuleBottomTabs
                  id={id}
                  activeVideo={activeVideo}
                  allContent={allContent}
                  data={data}
                />
              </div>
              {/* tabs section */}
            </div>

            <div className="col-span-11 lg:col-span-4  ">
              <ModuleSidebar
                groupedData={groupedCourseData}
                sectionOrder={sectionOrder}
                allContent={allContent}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default MainCourseContent;
