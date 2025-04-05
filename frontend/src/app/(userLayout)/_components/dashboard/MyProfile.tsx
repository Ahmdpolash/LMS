import React from "react";

const MyProfile = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">Full Name</p>
        <p className="text-slate-800 dark:text-white text-lg">Polash Ahmed</p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">Email</p>
        <p className="text-slate-800 dark:text-white text-lg">
          ahmedpolash732@gmail.com
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">Student ID</p>
        <p className="text-slate-800 dark:text-white text-lg">WEB8-1292</p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-800 dark:text-gray-400 text-sm">
          Mobile Number
        </p>
        <p className="text-slate-800 dark:text-white text-lg">+8801756213028</p>
      </div>
    </div>
  );
};

export default MyProfile;
