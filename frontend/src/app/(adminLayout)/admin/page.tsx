"use client";
import UserAnalytics from "@/app/_components/admin/pages/analytics/UserAnalytics";

import React from "react";
import DashHomeSchedule from "@/app/_components/admin/pages/Home/DashHomeSchedule";
import StatisticsBox from "@/app/_components/admin/pages/Home/StatisticsBox";
import TransactionTable from "@/app/_components/admin/pages/invoice/TransactionTable";
import CourseAnalytics from "@/app/_components/admin/pages/analytics/CourseAnalytics";

const page = () => {
  return (
    <div>
      {/* upper grid box */}

      <StatisticsBox />

      {/* analytics */}
      <div className="my-5 grid grid-cols-1  lg:grid-cols-2 gap-6">
        {" "}
        <UserAnalytics isDashboard={true} />{" "}
        <CourseAnalytics isDashboard={true} />
      </div>

      {/* schedule section */}
      <div>
        <DashHomeSchedule />
      </div>
      {/* transaction table */}
      <div className="mt-4 pb-6">
        <TransactionTable isDashboard={true} />
      </div>
    </div>
  );
};

export default page;
