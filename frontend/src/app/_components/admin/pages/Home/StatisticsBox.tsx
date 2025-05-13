import { Circle } from "rc-progress";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, BookOpen, DollarSign } from "lucide-react";
import { useGetModelCountQuery } from "@/redux/features/user/userApi";

const StatisticsBox = () => {
  const { data } = useGetModelCountQuery({ refetchOnMountOrArgChange: true });
  const statisticCard = [
    {
      id: 1,
      chartIcon: BarChart3,
      title: data?.data?.orderCount,
      description: "Sales Obtained",
      percentage: data?.data?.orderCount > 0 ? "+100.00%" : "0.00%",
    },
    {
      id: 2,
      chartIcon: Users,
      title: data?.data?.studentCount,
      description: "Total Students",
      percentage: "+100.00%",
    },
    {
      id: 3,
      chartIcon: BookOpen,
      title: data?.data?.courseCount,
      description: "Active Courses",
      percentage: "+100.00%",
    },
    {
      id: 4,
      chartIcon: DollarSign,
      title: data?.data?.totalAmount || "0",
      description: "Total Revenue",
      percentage: data?.data?.totalAmount > 0 ? "+100.00%" : "0.00%",
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {statisticCard?.map((item, idx) => (
        <Card
          key={idx}
          className="dark:bg-[#0F172A] text-white p-4 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <item.chartIcon className="h-6 w-6 text-[#22D3EE]" />
              </div>
              <div className="mt-2">
                <h2 className="text-3xl font-bold text-black dark:text-white">
                  {item?.title}
                </h2>
                <p className="text-slate-700 dark:text-[#22D3EE] text-sm mt-1">
                  {item?.description}
                </p>
              </div>
            </div>
            <div>
              <Circle
                percent={Number(item?.percentage)}
                trailColor="#D9D9D9"
                strokeWidth={4}
                strokeColor={
                  Number(item?.percentage.replace("%", "")) > 0
                    ? "#05DF72"
                    : "#e24d52"
                }
                className=" h-10 w-10 text-center mx-auto mb-2"
              />
              <div className="">
                <span className="text-green-400 text-sm font-medium">
                  {item?.percentage}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsBox;
