"use client";

import { useState } from "react";

import CourseOption from "@/app/_components/admin/pages/create-course/CourseOption";
import CourseInformation from "@/app/_components/admin/pages/create-course/CourseInformation";
import { FormProvider, useForm } from "react-hook-form";

const page = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
    category: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const [step, setStep] = useState<number>(1);

  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoUrl: "",
      thumbnail: "",

      courseContentData: [
        {
          videoUrl: "",
          title: "",
          description: "",
          videoSection: "Untitled Section",
          links: [
            {
              title: "",
              url: "",
            },
          ],
          suggestion: "",
        },
      ],
    },
  });

  //   const nextStep = () => {
  //     if (step < 5) {
  //       setStep(step + 1);
  //     }
  //   };

  const nextStep = () => {
    if (step === 4) {
      methods.handleSubmit((data) => {
        console.log("✅ Final Submit:", data);
        setStep(step + 1);
      })();
    } else {
      setStep(step + 1);
    }
  };
  const prevStep = () => setStep(step - 1);

  return (
    <div className="w-full  min-h-screen lg:max-w-5xl mx-auto">
      <CourseOption step={step} />

      <FormProvider {...methods}>
        <form className="mt-10 w-full ">
          {step === 1 && <CourseInformation />}

          {step === 2 && <div>option</div>}
          {step === 3 && <div>contet</div>}

          {step === 4 && <div>preview</div>}
          {step === 5 && (
            <div className="flex items-center justify-center w-full flex-col">
              <img
                src="https://i.ibb.co/LC1yhZG/Prize-cup-for-the-first-place-removebg-preview.png"
                alt="vector"
                className="w-[200px]"
              />

              <h1 className="text-[1.4rem] font-[600] mt-4">
                Course Adding Completed!
              </h1>
              <p className="text-gray-500 text-[1rem] font-[400] mt-1">
                We will process it and reach out to you in a days.
              </p>
            </div>
          )}

          <div className="w-full flex items-end justify-end mt-12">
            <button
              disabled={step <= 1}
              type="button"
              onClick={prevStep}
              className={`${
                step <= 1 && "cursor-not-allowed"
              } text-[1rem] text-gray-500 px-6 py-2.5`}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={step > 4}
              onClick={nextStep}
              className={`${
                step > 4 && "!bg-blue-300 cursor-not-allowed"
              } bg-blue-500 py-2.5 px-6 rounded-md text-white`}
            >
              {step > 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
