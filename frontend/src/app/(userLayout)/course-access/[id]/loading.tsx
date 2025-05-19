import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="mt-4 pb-4">
        <div className="h-4 w-10 animate-pulse bg-gray-200 rounded-md"></div>
      </div>
      <div className=" grid grid-cols-11 gap-4 py-5 ">
        <div className="col-span-10 lg:col-span-7 bg-gray-200 animate-pulse rounded-md h-[60vh]"></div>
        <div className="col-span-10 lg:col-span-4 bg-gray-200 animate-pulse h-[60vh] rounded-md">
          <div className="bg-gray-500 animate-pulse rounded-md">
            <div className="h-10 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
