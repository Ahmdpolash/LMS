import React from "react";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((card) => (
        <div className="" key={card}>
          <div
            key={card}
            className="animate-pulse bg-white dark:bg-[#1a2342] rounded-xl overflow-hidden shadow-sm border border-gray-300 dark:border-gray-800 flex flex-col lg:h-[460px]"
          >
            <div className="relative overflow-hidden h-48 bg-gray-200"></div>
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div className="h-6 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200 mb-3"></div>
              <div className="flex items-center mb-2">
                <div className="h-4 bg-gray-200 w-20 mr-2"></div>
                <div className="h-4 bg-gray-200 w-16 ml-1"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between ">
                  <div>
                    <div className="flex items-center">
                      <span className="h-8 bg-gray-200 w-10 block"></span>
                      <span className="h-4 bg-gray-200 w-8 block ml-2"></span>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm">
                      <div className="h-4 bg-gray-200 w-16 block"></div>
                    </div>
                    <div className="flex items-center justify-end text-gray-600 dark:text-gray-300 text-sm mt-1">
                      <div className="h-4 bg-gray-200 w-16 block"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 block"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
