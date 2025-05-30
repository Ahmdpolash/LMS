// import { useState } from "react";
// import { Link, PencilIcon } from "lucide-react";
// import { toast } from "sonner";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { VideoUploader } from "./VideoUploader";

// type TCourseProps = {
//   courseContentData: any;
//   setCourseContentData: (courseContentData: any) => void;
//   step: number;
//   setStep: (step: number) => void;
//   handleSubmit: any;
// };

// export const CourseContent = ({
//   setCourseContentData,
//   courseContentData,
//   step,
//   setStep,
//   handleSubmit: handleCourseSubmit,
// }: TCourseProps) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length).fill(false)
//   );

//   const handleCollapseToggle = (index: number) => {
//     const updatedCollasped = [...isCollapsed];
//     updatedCollasped[index] = !updatedCollasped[index];
//     setIsCollapsed(updatedCollasped);
//   };

//   const handleRemoveLink = (index: number, linkIndex: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.splice(linkIndex, 1);
//     // courseContentData(updatedData);
//     setCourseContentData(updatedData);
//   };

//   const handleAddLink = (index: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.push({ title: "", url: "" });
//     setCourseContentData(updatedData);
//     // courseContentData(updatedData);
//   };

//   // add new content
//   const newcontentHandler = (items: any) => {
//     if (
//       items.title === "" ||
//       items.description === "" ||
//       items.videoUrl === "" ||
//       items.links[0].title === "" ||
//       items.links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first to Proceed next step!");
//     } else {
//       let newVideoSection = "";

//       if (courseContentData.length > 0) {
//         const lastVideoSection =
//           courseContentData[courseContentData.length - 1].videoSection;

//         // use the last video section if available,else use user input
//         if (lastVideoSection) {
//           newVideoSection = lastVideoSection;
//         }
//       }

//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: newVideoSection,
//         links: [{ title: "", url: "" }],
//       };

//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   // add new content
//   const addNewSection = () => {
//     if (
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first!");
//     } else {
//       setStep(step + 1);
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: `Untitled Section `,
//         links: [{ title: "", url: "" }],
//       };

//       setCourseContentData([...courseContentData, newContent]);
//       toast.success("New section added!");
//     }
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//   };

//   // stepper btn
//   const prevStep = () => setStep(step - 1);
//   const handleOptions = () => {
//     if (
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first to Proceed next step!");
//     } else {
//       setStep(step + 1);
//       handleCourseSubmit();
//     }
//   };

//   return (
//     <>
//       <div className="space-y-6 dark:bg-[#101828]  p-5 rounded-md">
//         <form onSubmit={handleSubmit}>
//           {courseContentData?.map((item: any, idx: number) => {
//             const showSectionInput =
//               idx === 0 ||
//               item.videoSection !== courseContentData[idx - 1].videoSection;

//             return (
//               <div key={idx}>
//                 <div
//                   className={`w-full  p-4 ${
//                     showSectionInput ? "mt-6" : "mb-0"
//                   }`}
//                 >
//                   {showSectionInput && (
//                     <>
//                       <div className="flex items-center w-full">
//                         <input
//                           type="text"
//                           className={`text-[20px]  ${
//                             item.videoSection === "Untitled Section"
//                               ? "w-[170px]"
//                               : "w-min"
//                           } font-poppins  cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                           value={item.videoSection}
//                           onChange={(e) => {
//                             const updateData = [...courseContentData];
//                             updateData[idx].videoSection = e.target.value;
//                             setCourseContentData(updateData);
//                           }}
//                         />

//                         <PencilIcon
//                           size={21}
//                           className="cursor-pointer text-[10px] dark:text-white text-black"
//                         />
//                       </div>
//                     </>
//                   )}
//                   <div className="flex w-full justify-between items-center my-0">
//                     {isCollapsed[idx] ? (
//                       <>
//                         {item.title ? (
//                           <p className="font-poppins dark:text-white text-black">
//                             {idx + 1}.{item.title}{" "}
//                           </p>
//                         ) : (
//                           ""
//                         )}
//                       </>
//                     ) : (
//                       <div></div>
//                     )}

//                     {/* arrow button for collapsed video content */}

//                     <div className="flex items-center">
//                       <AiOutlineDelete
//                         className={`dark:text-white text-[20px] mr-2 text-black ${
//                           idx > 0 ? "cursor-pointer" : "cursor-no-drop"
//                         }`}
//                         onClick={() => {
//                           if (idx > 0) {
//                             const updateData = [...courseContentData];
//                             updateData.splice(idx, 1);
//                             setCourseContentData(updateData);
//                           }
//                         }}
//                       />
//                       <MdOutlineKeyboardArrowDown
//                         fontSize={"large"}
//                         className={`dark:text-white text-black  `}
//                         style={{
//                           transform: isCollapsed[idx]
//                             ? "rotate(180deg)"
//                             : "rotate(0deg)",
//                         }}
//                         onClick={() => {
//                           handleCollapseToggle(idx);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   {!isCollapsed[idx] && (
//                     <div className="flex flex-col space-y-4">
//                       <div className="my- flex flex-col space-y-2">
//                         <label id="title">Video Title</label>
//                         <input
//                           type="text"
//                           name="title"
//                           placeholder="Setup the first project"
//                           className="dark:bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
//                           value={item.title}
//                           onChange={(e) => {
//                             const updateData = [...courseContentData];
//                             updateData[idx].title = e.target.value;
//                             setCourseContentData(updateData);
//                           }}
//                           required
//                         />
//                       </div>
//                       <div className="my- flex flex-col space-y-2">
//                         {/* <label id="videoUrl">Video URL</label>
//                         <input
//                           type="text"
//                           name="videoUrl"
//                           placeholder="Set video URL"
//                           className="dark:bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600  focus:outline-none"
//                           value={item.videoUrl}
//                           onChange={(e) => {
//                             const updateData = [...courseContentData];
//                             updateData[idx].videoUrl = e.target.value;
//                             setCourseContentData(updateData);
//                           }}
//                         /> */}

//                         <VideoUploader
//                           label="Video URL"
//                           onUpload={(url) => {
//                             const updateData = [...courseContentData];
//                             updateData[idx].videoUrl = url;
//                             setCourseContentData(updateData);
//                           }}
//                         />
//                       </div>
//                       <div className="my- flex flex-col space-y-2">
//                         <label id="videoLength">Video Length</label>
//                         <input
//                           type="number"
//                           name="videoLength"
//                           placeholder="Set video Length (In Minutes)"
//                           className="dark:bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600  focus:outline-none"
//                           value={item.videoLength}
//                           onChange={(e) => {
//                             const updateData = [...courseContentData];
//                             updateData[idx].videoLength = e.target.value;
//                             setCourseContentData(updateData);
//                           }}
//                         />
//                       </div>
//                       <div className="my- flex flex-col space-y-2">
//                         <label id="description">Video Description</label>
//                         <textarea
//                           rows={6}
//                           cols={15}
//                           name="description"
//                           placeholder="Write about the video"
//                           className="border dark:bg-[#0C111B] rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 dark:border-slate-600 focus:outline-none !h-min"
//                           value={item.description}
//                           onChange={(e) => {
//                             const updateData = [...courseContentData];
//                             updateData[idx].description = e.target.value;
//                             setCourseContentData(updateData);
//                           }}
//                         />

//                         <br />
//                       </div>

//                       {item?.links?.map((link: any, linkIndex: number) => (
//                         <div key={linkIndex} className="mb-3">
//                           <div className="w-full flex space-y-2 items-center justify-between">
//                             <label>Link {linkIndex + 1}</label>

//                             <AiOutlineDelete
//                               className={`${
//                                 linkIndex === 0
//                                   ? "cursor-no-drop"
//                                   : "cursor-pointer"
//                               } text-black dark:text-white text-[20px]`}
//                               onClick={() =>
//                                 linkIndex === 0
//                                   ? null
//                                   : handleRemoveLink(idx, linkIndex)
//                               }
//                             />
//                           </div>
//                           <input
//                             type="text"
//                             placeholder="Source code (Link title)"
//                             className="w-full bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
//                             value={link.title}
//                             onChange={(e) => {
//                               const updateData = [...courseContentData];
//                               updateData[idx].links[linkIndex].title =
//                                 e.target.value;
//                               setCourseContentData(updateData);
//                             }}
//                           />
//                           <input
//                             type="text"
//                             placeholder="Source code Url (Link URL)"
//                             className="w-full dark:bg-[#0C111B] mt-3 border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
//                             value={link.url}
//                             onChange={(e) => {
//                               const updateData = [...courseContentData];
//                               updateData[idx].links[linkIndex].url =
//                                 e.target.value;
//                               setCourseContentData(updateData);
//                             }}
//                           />
//                         </div>
//                       ))}

//                       {/*  add link bottom */}

//                       <div className="inline-block mb-4">
//                         <span
//                           className="flex items-center text-[16px] dark:text-white ☐text-black cursor-pointer"
//                           onClick={() => handleAddLink(idx)}
//                         >
//                           <Link size={17} className="mr-2" /> Add Link
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   {/* add new content */}
//                   {idx == courseContentData.length - 1 && (
//                     <div className="pt-2">
//                       <span
//                         className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//                         onClick={(e: any) => newcontentHandler(item)}
//                       >
//                         <AiOutlinePlusCircle className="mr-2" /> Add New Content
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}

//           <div
//             className="mt-4 flex items-center text-[20px] dark:text-white text-black cursor-pointer"
//             onClick={() => addNewSection()}
//           >
//             <AiOutlinePlusCircle className="mr-2" /> Add new Section
//           </div>
//         </form>
//         <div className="w-full flex items-end justify-between py-8">
//           <button
//             disabled={step <= 1}
//             type="button"
//             onClick={prevStep}
//             className={`
//           py-2.5 px-6 rounded-md text-[1rem] text-white
//           ${
//             step <= 1
//               ? "cursor-not-allowed bg-blue-300"
//               : "cursor-pointer bg-blue-500"
//           }
//         `}
//           >
//             Previous
//           </button>

//           <button
//             type="button"
//             onClick={handleOptions}
//             className="bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer"
//           >
//             Next
//           </button>
//         </div>

//         {/* stepper btn */}
//       </div>
//     </>
//   );
// };

import { useState } from "react";
import { Link, PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VideoUploader } from "./VideoUploader";

type TCourseProps = {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  step: number;
  setStep: (step: number) => void;
  handleSubmit: any;
};

export const CourseContent = ({
  setCourseContentData,
  courseContentData,
  step,
  setStep,
  handleSubmit: handleCourseSubmit,
}: TCourseProps) => {
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
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  // Add new content
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
      toast.success("New content added!");
    }
  };

  // Add new section
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields in the current section first!");
    } else {
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
      toast.success("New section added!");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  // Stepper buttons
  const prevStep = () => setStep(step - 1);

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields to proceed to the next step!");
    } else {
      setStep(step + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, idx: number) => {
          const showSectionInput =
            idx === 0 ||
            item.videoSection !== courseContentData[idx - 1].videoSection;
          return (
            <div key={idx}>
              <div
                className={`w-full p-4 ${showSectionInput ? "mt-6" : "mb-0"}`}
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
                      <PencilIcon
                        size={21}
                        className="cursor-pointer text-[10px] dark:text-white text-black"
                      />
                    </div>
                  </>
                )}
                <div className="flex w-full justify-between items-center my-0">
                  {isCollapsed[idx] ? (
                    <>
                      {item.title ? (
                        <p className="font-poppins dark:text-white text-black">
                          {idx + 1}.{item.title}
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
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
                      className={`dark:text-white text-black`}
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
                        className="dark:bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[idx].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                        required
                      />
                    </div>
                    <div className="my- flex flex-col space-y-2">
                      <VideoUploader
                        label="Video URL"
                        onUpload={(url) => {
                          const updateData = [...courseContentData];
                          updateData[idx].videoUrl = url;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="my- flex flex-col space-y-2">
                      <label id="videoLength">Video Length</label>
                      <input
                        type="number"
                        name="videoLength"
                        placeholder="Set video Length (In Minutes)"
                        className="dark:bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
                        value={item.videoLength}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[idx].videoLength = e.target.value;
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
                        className="border dark:bg-[#0C111B] rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 dark:border-slate-600 focus:outline-none !h-min"
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[idx].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    {item?.links?.map((link: any, linkIndex: number) => (
                      <div key={linkIndex} className="mb-3">
                        <div className="w-full flex space-y-2 items-center justify-between">
                          <label>Link {linkIndex + 1}</label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(idx, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source code (Link title)"
                          className="w-full bg-[#0C111B] border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
                          value={link.title}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[idx].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Source code Url (Link URL)"
                          className="w-full dark:bg-[#0C111B] mt-3 border rounded-md py-2 px-4 placeholder:text-slate-500 border-slate-600 focus:outline-none"
                          value={link.url}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[idx].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                    ))}
                    <div className="inline-block mb-4">
                      <span
                        className="flex items-center text-[16px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(idx)}
                      >
                        <Link size={17} className="mr-2" /> Add Link
                      </span>
                    </div>
                  </div>
                )}
                {idx === courseContentData.length - 1 && (
                  <div className="pt-2">
                    <span
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => newcontentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <button
          type="button"
          className="mt-4 flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={addNewSection}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </button>
      </form>
      <div className="w-full flex items-end justify-between py-8">
        <button
          disabled={step <= 1}
          type="button"
          onClick={prevStep}
          className={`
            py-2.5 px-6 rounded-md text-[1rem] text-white 
            ${step <= 1 ? "cursor-not-allowed bg-blue-300" : "cursor-pointer bg-blue-500"}
          `}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleOptions}
          className="bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};