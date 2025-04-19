"use client";

import { useEffect, useState } from "react";

import CourseOption from "@/app/_components/admin/pages/create-course/CourseOption";
import CourseInformation from "@/app/_components/admin/pages/create-course/CourseInformation";
import { FormProvider, useForm } from "react-hook-form";
import CoursePB from "@/app/_components/admin/pages/create-course/CoursePB";
import { courseFormSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseContent } from "@/app/_components/admin/pages/create-course/CourseContent";
import CoursePreview from "@/app/_components/admin/pages/create-course/Preview";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import Success from "@/app/_components/admin/pages/create-course/Success";
import StepperButton from "@/app/_components/admin/pages/create-course/StepperButton";

const page = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: [],
    level: "",
    demoUrl: "",
    thumbnail: "",
    category: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  // const [tags, setTags] = useState([""]);
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

  const [step, setStep] = useState<number>(1);

  const methods = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      estimatedPrice: "",
      tags: [],
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

  const handleSubmitCourse = async (data: any) => {
    try {
      console.log("✅ Final Submit:", data);
      // You can add your API call here, e.g.:
      // await axios.post("/api/courses", data);
      toast.success("Course submitted successfully!");
      return true;
    } catch (error) {
      console.error("❌ Submit Error:", error);
      toast.error("Failed to submit course. Please try again.");
      return false;
    }
  };

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
        console.log("Tags:", data.tags);
        const courseData = {
          totalVideos: data?.courseContentData.length,
          ...data,
        };

        console.log("✅ Final Submit:", courseData);
        setStep(step + 1);
      })();
      return;
    }

    // if (step === 4) {
    //   const result = await methods.trigger(); // Validate everything

    //   if (!result) {
    //     toast.error("Please fix the errors before submitting.");
    //     return;
    //   }

    //   const success = await handleSubmitCourse(methods.getValues());
    //   if (success) setStep(step + 1);
    //   return;
    // }

    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="w-full  min-h-screen lg:max-w-6xl mx-auto">
      <CourseOption step={step} />

      <FormProvider {...methods}>
        <form
          // onSubmit={methods.handleSubmit(() => {
          //   nextStep();
          // })}
          onSubmit={methods.handleSubmit((data) => {
            console.log("Form submitted successfully:", data);
          })}
          className="mt-7 w-full "
        >
          {step === 1 && <CourseInformation />}

          {step === 2 && <CoursePB />}

          {step === 3 && (
            <CourseContent
              setCourseContentData={setCourseContentData}
              courseContentData={courseContentData}
            />
          )}

          {step === 4 && <CoursePreview />}

          {step === 5 && <Success />}

          <StepperButton step={step} prevStep={prevStep} nextStep={nextStep} />
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
