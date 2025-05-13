import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Calendar } from "lucide-react";

const DashHomeSchedule = () => {
  return (
    <div>
      <Card className="shadow-sm dark:bg-[#0F172A] border-gray-200 dark:border-gray-800 ">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Schedule
            </h2>
          </div>
        </div>
        <div className="p-4">
          <Tabs defaultValue="today">
            <TabsList className="mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <div className="bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)] p-3 rounded-lg mr-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Web Development Workshop</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2:00 PM - 4:00 PM
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Live Session
                </Badge>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <div className="bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)] p-3 rounded-lg mr-4">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Student Orientation</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    5:30 PM - 6:30 PM
                  </p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  Meeting
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="tomorrow" className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <div className="bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)] p-3 rounded-lg mr-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">UI/UX Design Principles</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10:00 AM - 12:00 PM
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Live Session
                </Badge>
              </div>
            </TabsContent>
            <TabsContent value="week" className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <div className="bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)] p-3 rounded-lg mr-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">JavaScript Advanced Concepts</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Friday, 1:00 PM - 3:00 PM
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Live Session
                </Badge>
              </div>
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <div className="bg-[rgb(37,150,190)]/10 text-[rgb(37,150,190)] p-3 rounded-lg mr-4">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Course Creator Meeting</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thursday, 4:00 PM - 5:00 PM
                  </p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  Meeting
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default DashHomeSchedule;
