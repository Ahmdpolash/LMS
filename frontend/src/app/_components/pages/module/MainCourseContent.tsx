import { useGetCourseContentQuery } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import CustomLoading from "../../CustomLoading";
import CourseContentMedia from "./CourseContentMedia";
import Container from "@/components/shared/Container";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const MainCourseContent = ({ id }: { id: string }) => {
  const { data: courseContent, isLoading } = useGetCourseContentQuery(id);
  const allContent = courseContent?.data;
  const [activeVideo, setActiveVideo] = useState(0);

  // grouping the video
  const [groupedCourseData, setGroupedCourseData] = useState({});
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);

  useEffect(() => {
    if (allContent) {
      const sections: { [key: string]: any[] } = {};
      const order: string[] = [];
      allContent.forEach((video: any) => {
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

  return (
    <Container>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div className=" grid grid-cols-10 gap-4 py-16">
          <div className="col-span-10 lg:col-span-7">
            <CourseContentMedia
              groupedData={groupedCourseData}
              sectionOrder={sectionOrder}
              allContent={allContent}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />

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

            {/* <CourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            /> */}
          </div>

          <div className="col-span-10 lg:col-span-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            pariatur eos labore iste necessitatibus amet debitis eius qui
            blanditiis non, cupiditate dolor placeat animi ex veritatis totam
            tenetur soluta, nam recusandae magnam fugiat ipsum delectus.
            Pariatur omnis doloribus nihil doloremque itaque corrupti, ipsam,
            minima praesentium est voluptatem ducimus vel error!
          </div>
        </div>
      )}
    </Container>
  );
};

export default MainCourseContent;
