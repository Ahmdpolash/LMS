// type TProps = {
//   data: any;
//   id: string;
//   activeVideo: number;
//   setActiveVideo: (activevideo: number) => void;
// };

// const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo }: TProps) => {

//     console.log(data)

//     return <div>

//   </div>;
// };

// export default CourseContentMedia;

import React from "react";
import ReactPlayer from "react-player";

type TProps = {
  groupedData: { [key: string]: any[] };
  sectionOrder: string[];
  allContent: any[];
  activeVideo: number;
  setActiveVideo: (activevideo: number) => void;
};

const CourseContentMedia = ({
  groupedData,
  sectionOrder,
  allContent,
  activeVideo,
  setActiveVideo,
}: TProps) => {
  return (
    <div className="w-full ">
      <div></div>
      {allContent && allContent[activeVideo]?.videoUrl ? (
        <div className=" mb-4 rounded-md overflow-hidden">
          <ReactPlayer
            url={allContent[activeVideo]?.videoUrl}
            controls
            width="100%"
            height="100%"
            className="rounded-md"
          />
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 text-center p-8 rounded-md mb-4 font-poppins">
          No video selected.
        </div>
      )}

      {/* You might want to display a simplified list of videos here or move the module/video list to the sidebar */}
      {/* <div>
        {sectionOrder.map((sectionName) => (
          <div key={sectionName}>
            <h3>{sectionName}</h3>
            <ul>
              {groupedData[sectionName]?.map((video: any) => (
                <li key={video._id}>{video.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CourseContentMedia;
