"use client";

import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Label,
} from "recharts";

import { useEffect, useState } from "react";
import CustomLoading from "@/app/_components/CustomLoading";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUserAnalyticsQuery({});

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.lastYearData) {
      const formattedData = data.data.lastYearData.map((item: any) => ({
        name: item.month,
        count: item.count,
      }));
      setAnalyticsData(formattedData);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div
          className={`${
            !isDashboard ? "" : " dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${
                isDashboard ? "!text-[20px]" : ""
              } px-5 !text-start`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className="px-5">Last 12 months analytics data</p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[100vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd" // Ensure the first and last labels are always displayed
                  label={
                    !isDashboard ? (
                      <Label
                        value="Month"
                        offset={0}
                        position="bottom"
                        style={{ textAnchor: "middle" }}
                      />
                    ) : undefined
                  }
                />
                <YAxis
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
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
