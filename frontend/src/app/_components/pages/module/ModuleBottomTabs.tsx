"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddQuestionMutation } from "@/redux/features/course/courseApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "sonner";
import { format } from "timeago.js";

const ModuleBottomTabs = ({ activeVideo, allContent, data, id }: any) => {
  const [addQuestion, { isLoading }] = useAddQuestionMutation();
  const { data: session } = useSession();
  const customUser = data || session?.user || null;
  const [activeTab, setActiveTab] = useState("overview");
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  // question & reply state
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");

  const isReviewExists = allContent?.reviews?.find(
    (item: any): any => item?.user === data?._id
  );

  console.log("data:", data);
  console.log("data?.avatar?.url:", data?.avatar?.url);

  // question submit
  const handleQuestionSubmit = async () => {
    if (question.length === 0) {
      toast.error("Question Cannot be Empty");
      return;
    }

    try {
      const res = await addQuestion({
        question,
        courseId: id,
        contentId: allContent[activeVideo]?._id, // activeVideo?._id,
      });
      console.log(res);

      if (res?.data?.success) {
        setQuestion("");
        toast.success("Question added successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again or contact support.");
    }
  };

  const handleAnswerSubmit = () => {
    console.log(" handleAnswerSubmit");
  };

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
            <span>
              {allContent[activeVideo]?.links?.map((link: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5 mt-3">
                  <h4 className=" text-lg">
                    {" "}
                    {link?.title && link?.title + " : "}
                  </h4>
                  <a
                    href={link?.url}
                    target="_blank"
                    className="text-[16px] text-[#439ca4] underline"
                  >
                    {link?.url}
                  </a>
                </div>
              )) || "No Resources in this Module"}
            </span>
          </div>
        </TabsContent>

        {/* Q&A tab */}

        <TabsContent value="qna">
          <div className="flex w-full mt-3">
            <Image
              src={
                customUser
                  ? customUser?.data?.avatar?.url ||
                    customUser?.user?.image ||
                    "/avatar.jpeg" // Check customUser for avatar.url then image
                  : "/avatar.jpeg"
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
              onClick={handleQuestionSubmit}
            >
              {isLoading ? "Adding..." : "Submit"}
            </div>
          </div>
          <br />
          <div className="border border-x w-full border-gray-700"></div>
          {/* question and reply section */}
          <div>
            <CommentReply
              activeVideo={activeVideo}
              allContent={allContent}
              answer={answer}
              setAnswer={setAnswer}
              setAnswerId={setAnswerId}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          </div>
        </TabsContent>

        {/* reviews tab */}
        <TabsContent value="reviews">
          <div className="flex w-full mt-3 gap-3">
            <Image
              src={
                customUser
                  ? customUser?.data?.avatar?.url ||
                    customUser?.user?.image ||
                    "/avatar.jpeg" // Check customUser for avatar.url then image
                  : "/avatar.jpeg"
              }
              height={50}
              width={50}
              alt="user"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col space-y-2 w-full">
              <div className="">
                <h5>Give a Rating</h5>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
              </div>

              <textarea
                name=""
                value={review}
                onChange={(e: any) => setReview(e.target.value)}
                id=""
                cols={15}
                rows={4}
                placeholder="Write your review..."
                className="outline-none bg-transparent mt-2 border border-[#ffffff57] lg:w-full p-2 rounded w-[90%] lg:text-[18px] font-Poppins"
              ></textarea>
            </div>
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

const CommentReply = ({
  activeVideo,
  allContent,
  answer,
  setAnswer,
  setAnswerId,
  handleAnswerSubmit,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {allContent[activeVideo]?.questions?.map((item: any, index: number) => (
          <CommentItem
            key={index}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            index={index}
            handleAnswerSubmit={handleAnswerSubmit}
            activeVideo={activeVideo}
            allContent={allContent}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  item,
  answer,
  setAnswer,
  index,
  handleAnswerSubmit,
  activeVideo,
  allContent,
}: any) => {
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item?.user?.avatar?.url || "/avatar.jpeg"}
            height={50}
            width={50}
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="pl-3">
            <h5 className="text-[18px]">{item?.user?.name}</h5>
            <p className="text-[16px]">{item?.question}</p>
            <small className="text-[#ffffff83]">
              {format(item?.createdAt)}{" "}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
