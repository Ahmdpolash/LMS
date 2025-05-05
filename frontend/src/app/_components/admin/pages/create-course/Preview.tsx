"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  DollarSign,
  FileText,
  Link,
  PlayCircle,
  Tag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFormContext } from "react-hook-form";
import CoursePlayer from "./CoursePlayer";

type TProps = {
  step: number;
  setStep: (step: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

export default function CoursePreview({
  step,
  setStep,
  courseData: data,
  handleCourseCreate,
}: TProps) {
  // This would normally come from your form state

  const prevStep = () => setStep(step - 1);

  const createCourse = async () => {
    handleCourseCreate();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white rounded-md p-5">
      {/* Progress Steps */}
      <div className="">
        <h1 className="text-[19px] sm:text-xl font-bold mb-6">
          Course Preview
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Course Info */}
          <div className="col-span-2 space-y-6">
            <Card className="bg-[#1a2234] border-[#2a3348] text-white overflow-hidden">
              <div className="w-full h-48 sm:h-64 md:h-80 relative">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              </div>

              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl sm:text-2xl">
                    {data?.name}
                  </CardTitle>
                  <CardTitle className="text-sm">0 Students</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      {data?.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>0 hours total</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{data?.courseData?.length} lessons</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{data?.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {data?.tags.map((tag: any, idx: number) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-4 bg-[#2a3348]" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {data.benefits.map((benefit: any, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4 bg-[#2a3348]" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Prerequisites</h3>
                  <ul className="space-y-2">
                    {data.prerequisites.map(
                      (prerequisite: any, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{prerequisite.title}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a2234] border-[#2a3348] text-white">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription className="text-gray-400">
                  0 lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {data?.courseData.map((item: any, sectionIndex: number) => (
                    <AccordionItem
                      key={sectionIndex}
                      value={`section-${sectionIndex}`}
                      className="border-b border-[#2a3348]"
                    >
                      <AccordionTrigger className="hover:text-blue-500">
                        <div className="text-left">
                          <div className="font-medium">
                            {item?.videoSection}
                          </div>
                          <div className="text-sm text-gray-400">
                            {item?.content?.length} lessons
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          <div className="flex items-start p-2 rounded hover:bg-[#2a3348]">
                            <PlayCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium">{data.title}</div>
                              <div className="text-sm text-gray-400 mt-1">
                                {data.description}
                              </div>
                              {item?.links?.length > 0 && (
                                <div className="mt-2 space-y-1 cursor-pointer">
                                  {item.links.map(
                                    (link: any, linkIndex: number) => (
                                      <div
                                        key={linkIndex}
                                        className="flex items-center text-sm text-blue-400 cursor-pointer"
                                      >
                                        <Link className="h-3.5 w-3.5 mr-1" />
                                        <span>{link.title}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 ">
            <Card className="bg-[#1a2234] border-[#2a3348] text-white md:sticky md:top-6">
              <CardHeader>
                <CardTitle>Course Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                    <span className="font-semibold">Price:</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">{data.price}</span>
                    {data.estimatedPrice && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        {data.estimatedPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-blue-500 mr-1" />
                    <span className="font-semibold">Category:</span>
                  </div>
                  <div className="text-right">{data.category}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-1" />
                    <span className="font-semibold">Level:</span>
                  </div>
                  <div>{data.level}</div>
                </div>

                {data.demoUrl && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <PlayCircle className="h-5 w-5 text-red-500 mr-1" />
                      <span className="font-semibold">Demo:</span>
                    </div>
                    <Button variant="link" className="text-blue-400 p-0 h-auto">
                      View Demo
                    </Button>
                  </div>
                )}

                <Separator className="my-2 bg-[#2a3348]" />

                <div className="pt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Submit Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-full flex items-end justify-between py-8">
        <button
          disabled={step <= 1}
          type="button"
          onClick={prevStep}
          className={`
          py-2.5 px-6 rounded-md text-[1rem] text-white 
          ${
            step <= 1
              ? "cursor-not-allowed bg-blue-300"
              : "cursor-pointer bg-blue-500"
          }
        `}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => createCourse()}
          className="bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// demo link e click korle vidoe modal from magic ui
