"use client";

import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

// const analyticsData = [
//   { name: "Jun 2023", uv: 3 },

//   { name: "July 2023", uv: 2 },

//   { name: "August 2023", uv: 5 },

//   { name: "Sept 2023", uv: 7 },

//   { name: "October 2023", uv: 2 },

//   { name: "Nov 2023", uv: 5 },

//   { name: "December 2023", uv: 7 },
// ];

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.lastYearData) {
      const formattedData = data.data.lastYearData.map((item: any) => ({
        name: item.month,
        uv: item.count,
      }));
      setAnalyticsData(formattedData);
    }
  }, [data]);

  const minValue = 0;

  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="h-screen">
          <div className="">
            <h3 className="px-5 text-start">Courses Analytics</h3>
            <p className="px-5 text-slate-800 dark:text-slate-300 pt-1">
              Last 12 months analytics data
            </p>
          </div>
          <div className="w-full h-[80%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="60%">
              <BarChart data={analyticsData}>
                <XAxis
                  dataKey="name"
                  interval="preserveStartEnd" // Ensure first and last labels are visible
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[minValue, "auto"]}
                  label={{
                    value: "Count",
                    angle: -90,
                    position: "left",
                    offset: 0,
                    style: { textAnchor: "middle" },
                  }}
                />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAnalytics;
