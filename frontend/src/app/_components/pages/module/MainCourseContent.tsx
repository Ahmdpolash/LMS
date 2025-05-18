import { useGetCourseContentQuery } from "@/redux/features/course/courseApi";
import React from "react";

const MainCourseContent = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCourseContentQuery(id);

  console.log(data);

  return <div>id : {id}</div>;
};

export default MainCourseContent;
