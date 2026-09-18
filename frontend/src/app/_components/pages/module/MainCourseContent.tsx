import {
  useGetCourseContentQuery,
  useUpdateCourseProgressMutation,
} from "@/redux/features/course/courseApi";
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
  const { data: courseContent, isLoading, error } = useGetCourseContentQuery(id);
  const [updateCourseProgress] = useUpdateCourseProgressMutation();
  const allContent = courseContent?.data;
  const [activeVideo, setActiveVideo] = useState(0);
  const [mark, setMark] = useState(false);

  const userCourse = data?.data?.courses?.find((c: any) => {
    const uCourseId = c?.courseId?._id || c?.courseId || c;
    return uCourseId?.toString() === id?.toString();
  });
  const completedLessons: string[] = userCourse?.completedLessons || [];

  const handleToggleLesson = async (lessonId: string) => {
    const isCompleted = completedLessons.includes(lessonId);
    try {
      await updateCourseProgress({
        courseId: id,
        lessonId,
        completed: !isCompleted,
      }).unwrap();
      toast.success(
        !isCompleted
          ? "Lecture marked as completed!"
          : "Lecture marked as incomplete"
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update progress");
    }
  };

  const handleVideoEnded = async (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      try {
        await updateCourseProgress({
          courseId: id,
          lessonId,
          completed: true,
        }).unwrap();
        toast.success("Lecture completed! 🎓");
      } catch (err) {
        // ignore
      }
    }
  };

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

  if (error) {
    const errorMsg =
      (error as any)?.data?.message || "Failed to load course content.";
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <p className="text-red-500 font-medium text-lg">{errorMsg}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  // allContent could still be undefined after isLoading=false (race condition)
  if (!isLoading && (!allContent || allContent.length === 0)) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">No course content available.</p>
        </div>
      </Container>
    );
  }

  const currentVideo = allContent?.[activeVideo];
  const currentSectionLength =
    currentVideo?.videoSection && groupedCourseData[currentVideo.videoSection]
      ? groupedCourseData[currentVideo.videoSection].length
      : 0;

  return (
    <Container>
      {isLoading || !allContent ? (
        <Loading />
      ) : (
        <>
          <div className="pb-3 mt-4 lg:mt-6 border-b w-full border-gray-400 dark:border-gray-700 flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <button className="cursor-pointer" onClick={goToPreviousVideo}>
                <CircleArrowLeft className="text-blue-500" />
              </button>
              <h3 className="text-[21px]  bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {activeVideo + 1}-{currentSectionLength} : {currentVideo?.title}
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
                onVideoEnded={handleVideoEnded}
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
                completedLessons={completedLessons}
                onToggleLesson={handleToggleLesson}
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default MainCourseContent;
