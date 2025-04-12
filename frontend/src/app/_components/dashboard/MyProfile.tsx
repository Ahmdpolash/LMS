"use client";
import { TUser } from "@/types";
import React from "react";

const MyProfile = ({user}:{user:TUser}) => {
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">Full Name</p>
        <p className="text-slate-800 dark:text-white text-lg">{user?.name}</p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">Email</p>
        <p className="text-slate-800 dark:text-white text-lg">{user?.email}</p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">Student ID</p>
        <p className="text-slate-800 dark:text-white text-lg">
          {user?.userId || "N/A"}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">
          Mobile Number
        </p>
        <p className="text-slate-800 dark:text-white text-lg">
          {user?.number || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
