"use client"

import { useState } from "react"
import { Check, Clock, DollarSign, FileText, Link, PlayCircle, Tag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CoursePreview() {
  // This would normally come from your form state
  const [courseData, setCourseData] = useState({
    name: "Complete Web Development",
    description:
      "A comprehensive course covering all aspects of modern web development from fundamentals to advanced concepts. Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack developer.",
    price: "$99.99",
    estimatedPrice: "$149.99",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["MERN", "FRONTEND", "BACKEND", "JavaScript", "React"],
    categories: ["Web Development", "Programming"],
    demoUrl: "https://example.com/demo",
    level: "Intermediate",
    benefits: [
      "Master both frontend and backend development",
      "Build real-world projects for your portfolio",
      "Learn industry best practices and coding standards",
      "Gain job-ready skills for the tech industry",
    ],
    prerequisites: [
      "Basic computer knowledge",
      "Understanding of HTML and CSS fundamentals",
      "No prior programming experience required",
    ],
    sections: [
      {
        title: "Getting Started with Web Development",
        content: [
          {
            title: "Setup the first project",
            videoUrl: "https://example.com/video1",
            description: "Learn how to set up your development environment and create your first project.",
            links: [{ title: "Source code", url: "https://github.com/example/project1" }],
          },
          {
            title: "HTML Fundamentals",
            videoUrl: "https://example.com/video2",
            description: "Understanding the building blocks of the web.",
            links: [],
          },
        ],
      },
      {
        title: "CSS and Styling",
        content: [
          {
            title: "CSS Basics",
            videoUrl: "https://example.com/video3",
            description: "Learn how to style your web pages with CSS.",
            links: [],
          },
        ],
      },
    ],
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white">
      {/* Progress Steps */}
      <div className="container mx-auto py-6 px-4">
       

        <h1 className="text-xl sm:text-2xl font-bold mb-6">Course Preview</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#1a2234] border-[#2a3348] text-white overflow-hidden">
              {courseData.thumbnail && (
                <div className="w-full h-48 sm:h-64 md:h-80 relative">
                  <img
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={`${courseData.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{courseData.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700">{courseData.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>12 hours total</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>
                        {courseData.sections.reduce((acc, section) => acc + section.content.length, 0)} lessons
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{courseData.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {courseData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-4 bg-[#2a3348]" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {courseData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4 bg-[#2a3348]" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Prerequisites</h3>
                  <ul className="space-y-2">
                    {courseData.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a2234] border-[#2a3348] text-white">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription className="text-gray-400">
                  {courseData.sections.length} sections •{" "}
                  {courseData.sections.reduce((acc, section) => acc + section.content.length, 0)} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {courseData.sections.map((section, sectionIndex) => (
                    <AccordionItem
                      key={sectionIndex}
                      value={`section-${sectionIndex}`}
                      className="border-b border-[#2a3348]"
                    >
                      <AccordionTrigger className="hover:text-blue-500">
                        <div className="text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-gray-400">{section.content.length} lessons</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {section.content.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-start p-2 rounded hover:bg-[#2a3348]">
                              <PlayCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium">{lesson.title}</div>
                                <div className="text-sm text-gray-400 mt-1">{lesson.description}</div>
                                {lesson.links.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {lesson.links.map((link, linkIndex) => (
                                      <div key={linkIndex} className="flex items-center text-sm text-blue-400">
                                        <Link className="h-3.5 w-3.5 mr-1" />
                                        <span>{link.title}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:col-span-1">
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
                    <span className="font-bold text-lg">{courseData.price}</span>
                    {courseData.estimatedPrice && (
                      <span className="text-gray-400 line-through ml-2 text-sm">{courseData.estimatedPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-blue-500 mr-1" />
                    <span className="font-semibold">Categories:</span>
                  </div>
                  <div className="text-right">{courseData.categories.join(", ")}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-1" />
                    <span className="font-semibold">Level:</span>
                  </div>
                  <div>{courseData.level}</div>
                </div>

                {courseData.demoUrl && (
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
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Submit Course</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        
      </div>
    </div>
  )
}
