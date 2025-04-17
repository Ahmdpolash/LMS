"use client";

// import { useState } from "react";
// import { useFieldArray, useFormContext } from "react-hook-form";

// const CourseContent = ({ methods }: any) => {
//   const { control, watch ,getValues} = useFormContext();
//   const data =  getValues("courseContentData");
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(data.length).fill(false)
//   );
// const [activeSection, setActiveSection] = useState(1);
//   console.log(data.courseContentData);
//   return (
//     <div>
//       <p> Hello, This is CourseContent Page </p>
//     </div>
//   );
// };
// export default CourseContent;

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trash,
  Pencil,
  ChevronDown,
  ChevronUp,
  PencilIcon,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const CourseContent = ({
  setCourseContentData,
  courseContentData,
}: any) => {
  const { control, getValues, setValue, register } = useFormContext();
  // const courseContentData = getValues("courseContentData");
  console.log(courseContentData);

  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    // courseContentData(updatedData);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
    // courseContentData(updatedData);
  };

  // add new content
  const newcontentHandler = (items: any) => {
    if (
      items.title === "" ||
      items.description === "" ||
      items.videoUrl === "" ||
      items.links[0].title === "" ||
      items.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last video section if available,else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };
  // add new content
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].items.description ===
        "" ||
      courseContentData[courseContentData.length - 1].items.videoUrl === "" ||
      courseContentData[courseContentData.length - 1].items.links[0].title ===
        "" ||
      courseContentData[courseContentData.length - 1].items.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section `,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].items.description ===
        "" ||
      courseContentData[courseContentData.length - 1].items.videoUrl === "" ||
      courseContentData[courseContentData.length - 1].items.links[0].title ===
        "" ||
      courseContentData[courseContentData.length - 1].items.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      // handlesubmit
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          {courseContentData?.map((item: any, idx: number) => {
            const showSectionInput =
              idx === 0 ||
              item.videoSection !== courseContentData[idx - 1].videoSection;

            return (
              <>
                <div
                  className={`w-full bg-[#cdc8c817] rounded-md p-4 ${
                    showSectionInput ? "mt-6" : "mb-0"
                  }`}
                >
                  {showSectionInput && (
                    <>
                      <div className="flex items-center w-full">
                        <input
                          type="text"
                          className={`text-[20px] ${
                            item.videoSection === "Untitled Section"
                              ? "w-[170px]"
                              : "w-min"
                          } font-poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                          value={item.videoSection}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[idx].videoSection = e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />

                        <PencilIcon className=" cursor-pointer dark:text-white text-black" />
                      </div>
                    </>
                  )}

                  <div className="flex w-full justify-between items-center my-0">
                    {isCollapsed[idx] ? (
                      <>
                        {item.title ? (
                          <p className="font-poppins dark:text-white text-black">
                            {idx + 1}.{item.title}{" "}
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}

                    {/* arrow button for collapsed video content */}

                    <div className="flex items-center">
                      <AiOutlineDelete
                        className={`dark:text-white text-[20px] mr-2 text-black ${
                          idx > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                        onClick={() => {
                          if (idx > 0) {
                            const updateData = [...courseContentData];
                            updateData.splice(idx, 1);
                            setCourseContentData(updateData);
                          }
                        }}
                      />
                      <MdOutlineKeyboardArrowDown
                        fontSize={"large"}
                        className={`dark:text-white text-black  `}
                        style={{
                          transform: isCollapsed[idx]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                        onClick={() => {
                          handleCollapseToggle(idx);
                        }}
                      />
                    </div>
                  </div>

                  {!isCollapsed[idx] && (
                    <div className="flex flex-col space-y-4">
                      <div className="my- flex flex-col space-y-2">
                        <label id="title">Video Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Setup the first project"
                          className="border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 dark:border-slate-400 focus:outline-none"
                          value={item.title}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[idx].title = e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                      <div className="my- flex flex-col space-y-2">
                        <label id="videoUrl">Video URL</label>
                        <input
                          type="text"
                          name="videoUrl"
                          placeholder="Set video URL"
                          className="border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 dark:border-slate-400 focus:outline-none"
                          value={item.videoUrl}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[idx].videoUrl = e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                      <div className="my- flex flex-col space-y-2">
                        <label id="description">Video Description</label>
                        <textarea
                          rows={6}
                          cols={15}
                          name="description"
                          placeholder="Write about the video"
                          className="border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 dark:border-slate-400 focus:outline-none !h-min"
                          value={item.description}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[idx].description = e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />

                        <br />
                        <br />
                      </div>
                      
                      {item?.links?.map((link: any, index: number) => {
                        <div className=" mb-3">l
                          <div className="w-full flex items-center justify-between">
                            <label>Link {index + 1}</label>

                            <AiOutlineDelete
                              className={`${
                                index === 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              } text-black dark:text-white text-[20px]`}
                              onClick={() =>
                                index === 0
                                  ? null
                                  : handleRemoveLink(idx, index)
                              }
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Source code (Link title)"
                            className="border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
                            value={link.title}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[idx].links[index].title =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Source code Url (Link URL)"
                            className="border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
                            value={link.url}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[idx].links[index].url = e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                        </div>;
                      })}
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Toaster />
    </>
  );
};

/*   const { fields, append, update, remove } = useFieldArray({
    control,
    name: "courseContentData",
  });*/
