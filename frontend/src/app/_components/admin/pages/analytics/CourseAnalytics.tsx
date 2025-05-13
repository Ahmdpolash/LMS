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
import CustomLoading from "@/app/_components/CustomLoading";

// const analyticsData = [
//   { name: "Jun 2023", uv: 3 },

//   { name: "July 2023", uv: 2 },

//   { name: "August 2023", uv: 5 },

//   { name: "Sept 2023", uv: 7 },

//   { name: "October 2023", uv: 2 },

//   { name: "Nov 2023", uv: 5 },

//   { name: "December 2023", uv: 7 },
// ];

type TProps = {
  isDashboard?: boolean;
};

const CourseAnalytics = ({ isDashboard }: TProps) => {
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
        <CustomLoading />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "dark:bg-[#101828] p-4 rounded-md"
              : " dark:bg-[#101828] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h3
              className={`${
                isDashboard ? "!text-[20px] pt-5 px-0" : "px-5"
              }  !text-start`}
            >
              Courses Analytics
            </h3>
            {!isDashboard && (
              <p className="px-5 text-slate-800 dark:text-slate-300 pt-1">
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[50vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <BarChart data={analyticsData}>
                <XAxis
                  dataKey="name"
                  interval="preserveStartEnd" // Ensure first and last labels are visible
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[minValue, "auto"]}
                  label={
                    !isDashboard ? (
                      <Label
                        value="Count"
                        angle={-90}
                        offset={0}
                        position="left"
                        style={{ textAnchor: "middle" }}
                      />
                    ) : undefined
                  }
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
