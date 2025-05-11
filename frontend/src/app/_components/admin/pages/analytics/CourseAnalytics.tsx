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

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  console.log(data);

  //   const analyticsData = [
  //     { name: "Jun 2023", uv: 3 },
  //     { name: "July 2023", uv: 2 },
  //     { name: "August 2023", uv: 5 },
  //     { name: "Sept 2023", uv: 7 },
  //     { name: "October 2023", uv: 2 },
  //     { name: "Nov 2023", uv: 5 },
  //     { name: "December 2023", uv: 7 },
  //   ];

  // Uncomment if you want to use dynamic data from API
  const analyticsData: any = [];
  data &&
    data?.data?.lastYearData?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

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
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={130} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
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
