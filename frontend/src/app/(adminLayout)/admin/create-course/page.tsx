"use client";

import { useEffect, useState } from "react";

import CourseOption from "@/app/_components/admin/pages/create-course/CourseOption";
import CourseInformation from "@/app/_components/admin/pages/create-course/CourseInformation";
import { FormProvider, useForm } from "react-hook-form";
import CoursePB from "@/app/_components/admin/pages/create-course/CoursePB";
import { courseFormSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseContent } from "@/app/_components/admin/pages/create-course/CourseContent";

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

  const [step, setStep] = useState<number>(3);

  const methods = useForm({
    resolver: zodResolver(courseFormSchema),
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
      benefits,
      courseContentData,
      prerequisites,
    },
  });

  useEffect(() => {
    console.log(`📋 Entered Step ${step}:`, methods.getValues());
  }, [step]);

  const nextStep = async () => {
    let isStepValid = false;

    if (step === 1)
      isStepValid = await methods.trigger([
        "name",
        "description",
        "price",
        "category",
        "level",
        "demoUrl",
        "thumbnail",
      ]);
    if (step === 2)
      isStepValid = await methods.trigger(["benefits", "prerequisites"]);

    if (step === 3) {
      methods.setValue("courseContentData", courseContentData);

      // Temporary bypass since RHF can't validate custom nested state
      setStep(step + 1);
      return;
    }

    if (step === 4) {
      methods.handleSubmit((data) => {
        console.log("✅ Final Submit:", data);
        setStep(step + 1);
      })();
      return;
    }

    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="w-full  min-h-screen lg:max-w-5xl mx-auto">
      <CourseOption step={step} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(() => {
            nextStep();
          })}
          className="mt-10 w-full "
        >
          {step === 1 && <CourseInformation />}

          {step === 2 && <CoursePB />}
          {step === 3 && (
            <CourseContent
              setCourseContentData={setCourseContentData}
              courseContentData={courseContentData}
            />
          )}

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

          <div className="w-full flex items-end justify-between py-8">
            <button
              disabled={step <= 1}
              type="button"
              onClick={prevStep}
              className={`${
                step <= 1 && "cursor-not-allowed hidden"
              } text-[1rem]  bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer`}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={step > 4}
              onClick={nextStep}
              className={`${
                step > 4 && "!bg-blue-300 cursor-not-allowed"
              } bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer`}
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
