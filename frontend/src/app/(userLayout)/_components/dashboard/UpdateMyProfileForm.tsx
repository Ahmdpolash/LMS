import { CreditCard, Mail, Smartphone, User } from "lucide-react";
import React from "react";

const UpdateMyProfileForm = () => {

    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <User className="w-5 h-5" />
          <p className="text-black dark:text-white text-s">Full Name</p>
        </div>
        <input
          type="text"
          className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white "
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Mail className="w-5 h-5" />
          <p className="text-black dark:text-white text-s">Email</p>
        </div>
        <input
          type="email"
          className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white placeholder:text-slate-800 placeholder:dark:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <CreditCard className="w-5 h-5" />
          <p className="text-black dark:text-white text-s">Student ID </p>
        </div>
        <input
          type="text"
          placeholder="N/A"
          disabled
          className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white cursor-no-drop"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Smartphone className="w-5 h-5" />
          <p className="text-black dark:text-white text-s">Mobile Number</p>
        </div>
        <input
          type="text"
          className="w-full bg-gray-300 dark:bg-slate-800 rounded-md border border-dashed border-purple-500 p-2 text-black dark:text-white "
        />
      </div>
    </div>
  );
};

export default UpdateMyProfileForm;
