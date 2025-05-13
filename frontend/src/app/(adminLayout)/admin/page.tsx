"use client";
import UserAnalytics from "@/app/_components/admin/pages/analytics/UserAnalytics";

import React from "react";
import DashHomeSchedule from "@/app/_components/admin/pages/Home/DashHomeSchedule";
import StatisticsBox from "@/app/_components/admin/pages/Home/StatisticsBox";
import TransactionTable from "@/app/_components/admin/pages/invoice/TransactionTable";

const page = () => {
  return (
    <div>
      {/* upper grid box */}

      <StatisticsBox />

      {/* analytics */}
      <div className="my-5 ">
        {" "}
        <UserAnalytics isDashboard={true} />{" "}
      </div>

      {/* transaction table */}
      <div className="mb-4">
        <TransactionTable isDashboard={true} />
      </div>
      {/* schedule section */}
      <div>
        <DashHomeSchedule />
      </div>
    </div>
  );
};

export default page;
