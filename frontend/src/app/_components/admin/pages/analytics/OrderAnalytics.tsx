"use client";

import CustomLoading from "@/app/_components/CustomLoading";
import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const OrderAnalytics = ({ isDashboard }: { isDashboard?: boolean }) => {
  const { data, isLoading } = useGetOrderAnalyticsQuery({});

  console.log(data);

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.lastYearData) {
      const formattedData = data.data.lastYearData.map((item: any) => ({
        name: item.month,
        Count: item.count,
      }));
      setAnalyticsData(formattedData);
    }
  }, [data]);

  const minValue = 0;

  return (
    <div>
      {isLoading ? (
        <CustomLoading/>
      ) : (
        <div className="h-screen">
          <div>
            <h3 className="px-5 text-start">Orders Analytics</h3>
            <p className="px-5 text-slate-800 dark:text-slate-300 pt-1">
              Last 12 months analytics data
            </p>
          </div>

          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[minValue, "auto"]} />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAnalytics;
