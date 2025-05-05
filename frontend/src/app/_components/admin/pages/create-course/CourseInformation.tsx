"use client";

import FileInput from "./FileInput";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { CourseInfo } from "@/types/course";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  courseInfo: CourseInfo;
  setCourseInfo: (courseInfo: CourseInfo) => void;
  step: number;
  setStep: (step: number) => void;
};

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  step,
  setStep,
}: Props) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
 

    const allFieldsFilled =
      courseInfo.name.trim() !== "" &&
      courseInfo.description.trim() !== "" &&
      courseInfo.price !== 0 &&
      courseInfo.tags.filter((tag) => tag.trim() !== "").length > 0 &&
      courseInfo.level.trim() !== "" &&
      courseInfo.demoUrl.trim() !== "" &&
      courseInfo.thumbnail !== null &&
      courseInfo.category.trim() !== "";

    if (allFieldsFilled) {
       setStep(step + 1);
    } else {
      toast.error(
        "Please fill all the fields first to proceed to the next step!"
      );
    }
  };
  const [tagInput, setTagInput] = useState("");

  return (
    <>
      <div className="space-y-5 dark:bg-[#101828]  p-5 rounded-md">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="name">Course Name</label>

            <Input
              type="text"
              name="name"
              id="name"
              required
              value={courseInfo.name}
              placeholder="Complete web Developement"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, name: e.target.value })
              }
              className="placeholder:text-slate-500 border-slate-600  mb-1"
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="description">Course Description</label>

            <Textarea
              name="description"
              id="description"
              required
              value={courseInfo.description}
              placeholder="Write About this course"
              className="min-h-[120px] resize-y placeholder:text-slate-500"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, description: e.target.value })
              }
            />
          </div>

          {/* price and estimated price */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="price">Course Price</label>
              <Input
                name="price"
                type="number"
                id="price"
                required
                value={courseInfo.price}
                placeholder="1500"
                onChange={(e) =>
                  setCourseInfo({
                    ...courseInfo,
                    price: parseFloat(e.target.value),
                  })
                }
                className="placeholder:text-slate-500 border-slate-600  mb-1"
              />
            </div>

            <div className="w-full flex flex-col space-y-2">
              <label className="" htmlFor="estimatedPrice">
                Course Estimated Price (optional)
              </label>
              <Input
                name="estimatedPrice"
                id="estimatedPrice"
                type="number"
                value={courseInfo.estimatedPrice}
                placeholder="2000"
                onChange={(e) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="placeholder:text-slate-500 border-slate-600  mb-1"
              />
            </div>
          </div>

          {/* tags and category */}

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="tags">Tags</label>
              <Input
                name="tags"
                id="tags"
                required
                value={tagInput}
                placeholder="web, development, javascript"
                // onChange={(e) =>
                //   setCourseInfo({
                //     ...courseInfo,
                //     tags: e.target.value.split(",").map((tag) => tag.trim()),
                //   })
                // }
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setTagInput(inputValue);

                  const parsedTags = inputValue
                    .split(/[,\s]+/)
                    .map((tag) => tag.trim().toUpperCase())
                    .filter(
                      (tag, index, self) => tag && self.indexOf(tag) === index
                    );

                  setCourseInfo({
                    ...courseInfo,
                    tags: parsedTags,
                  });
                }}
                className="placeholder:text-slate-500 border-slate-600  mb-1"
              />
            </div>

            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="category">Category</label>
              <Select
                value={courseInfo.category}
                onValueChange={(value) =>
                  setCourseInfo({ ...courseInfo, category: value })
                }

                // className="placeholder:text-slate-500 border-slate-600  mb-1"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* level and demourl */}

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="demoUrl">Demo URL</label>
              <Input
                name="demoUrl"
                id="demoUrl"
                required
                value={courseInfo?.demoUrl}
                placeholder="https://example.com"
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                }
                className="placeholder:text-slate-500 border-slate-600  mb-1"
              />
            </div>

            <div className="w-full flex flex-col space-y-2">
              <label htmlFor="level">Level</label>
              <Select
                value={courseInfo.level}
                onValueChange={(value) =>
                  setCourseInfo({ ...courseInfo, level: value })
                }

                // className="placeholder:text-slate-500 border-slate-600  mb-1"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* thumbnail */}
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="thumbnails">Video Thumbnail</label>
            <FileInput
              value={courseInfo.thumbnail}
              onChange={(fileObj: { public_id: string; url: string } | null) =>
                setCourseInfo({ ...courseInfo, thumbnail: fileObj  })
              }
            />
          </div>

          {/* stepper button */}

          <div className="w-full flex items-center justify-end  py-2">
            <input
              type="submit"
              // value={step > 3 ? "Submit" : "Next"}
              value={"Next"}
              className={`bg-blue-500 py-2.5 px-6 w- rounded-md text-white cursor-pointer ${
                step > 3 && "!bg-blue-300 cursor-not-allowed"
              }`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseInformation;
