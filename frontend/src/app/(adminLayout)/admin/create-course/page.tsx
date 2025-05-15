"use client";

import { useState } from "react";

import CourseOption from "@/app/_components/admin/pages/create-course/CourseOption";
import CourseInformation from "@/app/_components/admin/pages/create-course/CourseInformation";

import CoursePB from "@/app/_components/admin/pages/create-course/CoursePB";

import { CourseContent } from "@/app/_components/admin/pages/create-course/CourseContent";
import CoursePreview from "@/app/_components/admin/pages/create-course/Preview";

import Success from "@/app/_components/admin/pages/create-course/Success";

import { useCreateCourseMutation } from "@/redux/features/course/courseApi";

import { CourseInfo } from "@/types/course";
import { toast } from "sonner";

const CreateCoursePage = () => {
  const [createCourse] = useCreateCourseMutation();

  const [step, setStep] = useState<number>(1);

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: [],
    level: "",
    demoUrl: "",
    thumbnail: { public_id: "", url: "" },
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
      videoLength: "",
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
  console.log(courseContentData);

  const handleSubmit = async () => {
    //format benefit array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    //format course content array
    const formattedCourseContent = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      videoLength: content.videoLength,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    // prepare data object

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      category: courseInfo.category,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContent,
      totalVideos: courseContentData.length,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    const data = courseData;

    try {
      const res = await createCourse(data).unwrap();
      console.log("Course created successfully:", res);
      if (res?.success) {
        toast.success("Course created successfully!");
        setStep(5);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="w-full  min-h-screen lg:max-w-6xl mx-auto">
      <CourseOption step={step} />

      {step === 1 && (
        <CourseInformation
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
          step={step}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <CoursePB
          step={step}
          setStep={setStep}
          prerequisites={prerequisites}
          setPrerequisites={setPrerequisites}
          benefits={benefits}
          setBenefits={setBenefits}
        />
      )}

      {step === 3 && (
        <CourseContent
          setCourseContentData={setCourseContentData}
          courseContentData={courseContentData}
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
        />
      )}

      {step === 4 && (
        <CoursePreview
          step={step}
          setStep={setStep}
          courseData={courseData}
          handleCourseCreate={handleCourseCreate}
        />
      )}

      {step === 5 && <Success step={step} setStep={setStep} />}

      {/* <StepperButton
            step={step}
            prevStep={prevStep}
            nextStep={nextStep}
            isSubmitting={isLoading}
          /> */}
    </div>
  );
};

export default CreateCoursePage;
