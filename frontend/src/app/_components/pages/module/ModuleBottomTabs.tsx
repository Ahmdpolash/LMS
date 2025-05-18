import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const ModuleBottomTabs = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="mb-8"
    >
      <TabsList className="w-full grid mt-3 grid-cols-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1">
        <TabsTrigger
          value="overview"
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
        >
          Resources
        </TabsTrigger>

        <TabsTrigger
          value="qna"
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
        >
          Q&A
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-[#1a2342]"
        >
          Reviews
        </TabsTrigger>
      </TabsList>



      <TabsContent value="overview">



      </TabsContent>
    </Tabs>
  );
};

export default ModuleBottomTabs;
