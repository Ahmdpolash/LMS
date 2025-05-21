"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddQuestionMutation,
  useReplyQuestionMutation,
} from "@/redux/features/course/courseApi";
import {
  MessageCircleMore,
  MessageSquareMore,
  VerifiedIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "sonner";
import { format } from "timeago.js";

const ModuleBottomTabs = ({ activeVideo, allContent, data, id }: any) => {
  const [addQuestion, { isLoading }] = useAddQuestionMutation();
  const [addReply, { isLoading: replyLoading }] = useReplyQuestionMutation();
  const { data: session } = useSession();
  const customUser = data || session?.user || null;
  const [activeTab, setActiveTab] = useState("overview");
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  // question & reply state
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const isReviewExists = allContent?.reviews?.find(
    (item: any): any => item?.user === data?._id
  );

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

  // reply question

  const handleAnswerSubmit = async () => {
    if (answer.length === 0) {
      toast.error("Answer Cannot be Empty");
      return;
    }

    try {
      const res = await addReply({
        answer,
        questionId: questionId,
        courseId: id,
        contentId: allContent[activeVideo]?._id,
      });

      if (res?.data?.success) {
        setAnswer("");
        toast.success("Answer added successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again or contact support.");
      console.log(error);
    }
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
              className="outline-none bg-transparent ml-3 border  border-gray-500 dark:border-[#ffffff57] lg:w-full p-2 rounded w-[90%] lg:text-[18px] font-Poppins"
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
              setQuestionId={setQuestionId}
              handleAnswerSubmit={handleAnswerSubmit}
              replyLoading={replyLoading}
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
                className="outline-none bg-transparent mt-2 border border-gray-500 dark:border-[#ffffff57] lg:w-full p-2 rounded w-[90%] lg:text-[18px] font-Poppins"
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
  setQuestionId,
  handleAnswerSubmit,
  replyLoading,
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
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            replyLoading={replyLoading}
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
  setQuestionId,
  handleAnswerSubmit,
  replyLoading,
}: any) => {
  const [isReplyActive, setIsReplyActive] = useState(false);
  console.log(item, "item");
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
            <p className="text-[16px] text-black dark:text-slate-300">
              {item?.question}
            </p>
            <small className="text-black dark:text-[#ffffff83]">
              {format(item?.createdAt)}{" "}
            </small>
          </div>
        </div>

        <div className="w-full flex items-center">
          <span
            className="lg:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setIsReplyActive(!isReplyActive);
              setQuestionId(item?._id);
            }}
          >
            {!isReplyActive
              ? item.questionReplies.length != 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <div className="flex items-center">
            <MessageSquareMore
              size={18}
              className="cursor-pointer text-gray-500 dark:text-gray-400"
            />
            <span className="pl-1 text-black dark:text-[#ffffff83] cursor-pointer ">
              {item.questionReplies.length}
            </span>
          </div>
        </div>
        {isReplyActive && (
          <>
            {item?.questionReplies?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="w-full flex lg:ml-16 my-5 text-black dark:text-white"
              >
                <div>
                  <Image
                    src={item?.userId?.avatar?.url || "/avatar.jpeg"}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center gap-2">
                    <h5 className="text-[20px]">{item?.userId?.name}</h5>{" "}
                    <VerifiedIcon className="text-[#50c750] text-[16px]" />
                  </div>
                  <p>{item?.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item?.createdAt)}.
                  </small>
                </div>
              </div>
            ))}

            <div className="w-full flex relative">
              <input
                type="text"
                placeholder="Enter your answer..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className="block lg:ml-12 mt-2 outline-none bg-transparent border-b border-gray-400 dark:text-white text-black  dark:border-[#fff] p-[5px] w-[95%]"
              />
              <button
                type="submit"
                className={`absolute right-0 bottom-1 cursor-pointer ${replyLoading ? 'cursor-no-drop' : ''}`}
                onClick={handleAnswerSubmit}
                disabled={answer === ""}
              >
                {replyLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
            <br />
          </>
        )}
      </div>
    </>
  );
};
