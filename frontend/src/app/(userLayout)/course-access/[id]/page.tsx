"use client";

import CustomLoading from "@/app/_components/CustomLoading";
import MainCourseContent from "@/app/_components/pages/module/MainCourseContent";
import { useCurrentUserQuery } from "@/redux/api/baseApi";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CourseAccessPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const { data, isLoading, error } = useCurrentUserQuery({});

  useEffect(() => {
    if (error) {
      router.replace("/");
      return;
    }

    if (!isLoading && data?.data) {
      const user = data.data;
      const isAdminOrInstructor =
        user.role === "admin" || user.role === "instructor";
      const isPurchased = user.courses?.some((item: any) => {
        const userCourseId = item?.courseId?._id || item?.courseId || item;
        return userCourseId?.toString() === id;
      });

      if (!isAdminOrInstructor && !isPurchased) {
        router.replace("/");
      }
    }
  }, [data, isLoading, error, id, router]);

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
