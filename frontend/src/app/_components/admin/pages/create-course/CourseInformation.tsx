// import { FC } from "react";

// type Props = {
//   courseInfo: any;
//   setCourseInfo: (courseInfo: any) => void;
//   step: number;
//   setStep: (step: number) => void;
// };

// const CourseInformation: FC<Props> = ({
//   courseInfo,
//   setCourseInfo,
//   step,
//   setStep,
// }) => {
//   return (
//     <div>
//       <p> HELLO I Am CourseInformation </p>
//     </div>
//   );
// };
// export default CourseInformation;

"use client";

import FormField from "@/components/Auth/FormField";
import { Controller, useFormContext } from "react-hook-form";
import FileInput from "./FileInput";

const CourseInformation = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-5">
      <FormField
        control={control}
        name="name"
        label="Course Name"
        placeholder="Complete web Developement"
        className="placeholder:text-slate-500 border-slate-600 "
      />
      <FormField
        control={control}
        name="description"
        label="Course Description"
        placeholder="Write About this course"
        as="textarea"
        className="min-h-[120px] resize-y placeholder:text-slate-500"
      />

      {/* price */}
      <div className="flex w-full gap-5">
        <div className="w-full">
          <FormField
            control={control}
            name="price"
            label="Course Price"
            placeholder="Enter price"
            type="text"
            className="placeholder:text-slate-500"
          />
        </div>

        <div className="w-full">
          <FormField
            control={control}
            name="estimatedPrice"
            label="Estimated Price (optional)"
            placeholder="Enter estimated price"
            type="text"
            required
            className="placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* tags and category */}
      <div className="flex w-full gap-5">
        <div className="w-full">
          <FormField
            control={control}
            name="tags"
            label="Course Tags"
            placeholder="MERN , FRONTEND , BACKEND etc.."
            type="text"
            className="placeholder:text-slate-500"
          />
        </div>

        <div className="w-full">
          <FormField
            control={control}
            name="category"
            label="Course Categories"
            as="select"
            placeholder="Select Categories"
            options={[
              { label: "Programming", value: "programming" },
              { label: "Digital Marketing", value: "marketing" },
              { label: "Graphics Design", value: "graphics" },
            ]}
            className="w-full"
          />
        </div>
      </div>

      {/* level and demourl */}
      <div className="flex w-full gap-5">
        <div className="w-full">
          <FormField
            control={control}
            name="demoUrl"
            label="Course Demo URL"
            placeholder="https://google.com/demourl"
            type="text"
            className="placeholder:text-slate-500"
          />
        </div>

        <div className="w-full">
          <FormField
            control={control}
            name="level"
            label="Course Level"
            as="select"
            placeholder="Select level"
            options={[
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
            ]}
            className="w-full placeholder:text-slate-500 "
          />
        </div>
      </div>

      {/* drag file */}
      <div className="w-full">
      <Controller
        control={control}
        name="thumbnail"
        render={({ field }) => <FileInput value={field.value} onChange={field.onChange} />}
      />
      </div>
    </div>
  );
};

export default CourseInformation;
