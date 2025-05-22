"use client";

import CustomLoading from "@/app/_components/CustomLoading";
import MainCourseContent from "@/app/_components/pages/module/MainCourseContent";
import { useCurrentUserQuery } from "@/redux/api/baseApi";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

// disbale console/ right click feature

const CourseAccessPage = ({ params }: Props) => {
  const { id } = React.use(params);

  const { data, isLoading, error } = useCurrentUserQuery(undefined, {});

  useEffect(() => {
    if (error) {
      redirect("/");
      return;
    }

    if (!isLoading && data?.data?.courses) {
      const isPurchased = data?.data?.courses?.find(
        (item: any) => item.courseId?._id === id
      );

      if (!isPurchased) {
        redirect("/");
      }
    }
  }, [data, isLoading, error, id]);

  return (
    <div className="bg-gray-50 dark:bg-[#0C111B]  dark:bg-gradient-to-r from-[#0C111B] to-[#131c36] ">
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div>
          <MainCourseContent id={id} data={data} />
        </div>
      )}
    </div>
  );
};
export default CourseAccessPage;
