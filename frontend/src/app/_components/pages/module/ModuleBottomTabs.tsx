"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const ModuleBottomTabs = ({ activeVideo, allContent, data }: any) => {
  const { data: session } = useSession();
  const customUser = data || session?.user || null;
  const [activeTab, setActiveTab] = useState("overview");

  const [question, setQuestion] = useState("");

  return (
    <div>
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="w-full grid mt-3 grid-cols-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1 ">
          <TabsTrigger
            value="overview"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
          >
            Resources
          </TabsTrigger>

          <TabsTrigger
            value="qna"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
          >
            Q&A
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* overview tab */}
        <TabsContent value="overview">
          <div className="mt-4 ">
            <h3 className="text-lg font-semibold mb-2">Module Overview</h3>
            <p>
              {allContent[activeVideo]?.description || "No Module Overview"}
            </p>
            <span className="mt-4 block italic">
              ## If you have any questions or concerns about this module, please
              don't hesitate to reach out to our support team. We're here to
              help you ! <strong>support@elearning.com.</strong>
              <br />
              <br />
              ## also you can ask questions in the Q&A section !
            </span>
          </div>
        </TabsContent>

        {/* resources tab */}
        <TabsContent value="resources">
          <div className="mt-4 ">
            <h3 className="text-[18px] font-semibold mb-2">Module Resources</h3>
            <p>
              {allContent[activeVideo]?.links?.map((link: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5 mt-3">
                  <h4 className=" text-lg">
                    {" "}
                    {link?.title && link?.title + " : "}
                  </h4>
                  <a
                    href={link?.url}
                    target="_blank"
                    className="text-[16px] text-[#439ca4]"
                  >
                    {link?.url}
                  </a>
                </div>
              )) || "No Resources in this Module"}
            </p>
          </div>
        </TabsContent>

        {/* Q&A tab */}

        <TabsContent value="qna">
          <div className="flex w-full mt-3">
            <Image
              src={
                customUser
                  ? customUser.avatar?.url || "/avatar.jpeg"
                  : session?.user?.image || "/avatar.jpeg"
              }
              height={50}
              width={50}
              alt="user"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />

            <textarea
              name=""
              value={question}
              onChange={(e: any) => setQuestion(e.target.value)}
              id=""
              cols={15}
              rows={4}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] lg:w-full p-2 rounded w-[90%] lg:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end cursor-pointer">
            <div
              className="!w-[120px] rounded-full flex justify-center items-center bg-[#3084FF] !h-[40px] text-[18px] mt-5"
              // onClick={isLoading ? null: handleCommentSubmit)
            >
              Submit
            </div>
          </div>

          {/* question and reply section */}
          <div></div>
        </TabsContent>


        {/* reviews tab */}
        <TabsContent value="reviews">
          <div className="flex w-full mt-3">
            <Image
              src={
                customUser
                  ? customUser.avatar?.url || "/avatar.jpeg"
                  : session?.user?.image || "/avatar.jpeg"
              }
              height={50}
              width={50}
              alt="user"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />

            <textarea
              name=""
              value={question}
              onChange={(e: any) => setQuestion(e.target.value)}
              id=""
              cols={15}
              rows={4}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] lg:w-full p-2 rounded w-[90%] lg:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end cursor-pointer">
            <div
              className="!w-[120px] rounded-full flex justify-center items-center bg-[#3084FF] !h-[40px] text-[18px] mt-5"
              // onClick={isLoading ? null: handleCommentSubmit)
            >
              Submit
            </div>
          </div>

          {/* question and reply section */}
          <div></div>

          {/* reviews tab */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleBottomTabs;
