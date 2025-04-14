import React, { useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdDone } from "react-icons/md";

export const stepsData = [
  { id: 1, name: "Course Information" },
  { id: 2, name: "Course Options" },
  { id: 3, name: "Course Content" },
  { id: 4, name: "Course Preview" },
];

interface CourseOptionProps {
  step: number;
}

const CourseOption: React.FC<CourseOptionProps> = ({ step }) => {
  return (
    <>
      <div className="w-full flex-col lg:flex-row  flex items-center gap-[10px] lg:gap-[20px ">
        {stepsData?.map((stepItem, index) => (
          <p key={index} className="flex items-center w-full gap-[10px]">
            {step <= stepItem.id && (
              <p
                className={`w-[30px] h-[30px] p-[20px] text-gray-500 flex items-center justify-center text-[1.2rem] rounded-full bg-gray-50`}
              >
                {stepItem?.id}
              </p>
            )}

            {step >= stepItem.id + 1 && (
              <div className="p-[10px] h-[40px] w-[40px] rounded-full bg-blue-500 text-white flex items-center justify-center">
                <MdDone className="text-[3rem]" />
              </div>
            )}

            <p
              className={`${
                step > stepItem.id
                  ? "!text-blue-500"
                  : "text-black dark:text-white"
              } capitalize text-[0.9rem] font-[400] sm:w-[75%] min-w-fit`}
            >
              {stepItem?.name}
            </p>

            {index < stepsData?.length - 1 && (
              <div
                className={`${
                  step >= stepItem.id + 1 ? "bg-blue-500" : "bg-[#384766]"
                } w-full h-[5px] rounded-full`}
              ></div>
            )}
          </p>
        ))}
      </div>
    </>
  );
};

export default CourseOption;
