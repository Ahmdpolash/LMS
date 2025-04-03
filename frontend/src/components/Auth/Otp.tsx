"use client";

import type React from "react";

import { useState } from "react";
import { Shield, Check } from "lucide-react";
import Link from "next/link";
import { TabsContent } from "../ui/tabs";

export default function Otp() {
  const [otp, setOtp] = useState(["3", "7", "7", "4"]);

  const handleVerify = () => {
    // Handle verification logic here
    console.log("Verifying OTP:", otp.join(""));
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    
      <div className="flex flex-col items-center justify-center  bg-[#0f1524] text-white p-4">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-8">Verify Your Account</h1>

          <div className="bg-[#4169e1] rounded-full p-5 mb-10">
            <div className="flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
              <Check className="w-5 h-5 text-white absolute" />
            </div>
          </div>

          <div className="flex gap-4 mb-8 w-full justify-center">
            {otp.map((digit, index) => (
              <div key={index} className="w-16 h-16 relative">
                <input
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-full bg-transparent text-center text-xl font-bold border-2 border-white/30 rounded-md focus:border-[#4169e1] focus:outline-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-4 bg-[#4169e1] text-white rounded-full font-medium mb-8 hover:bg-[#3a5cd0] transition-colors"
          >
            Verify OTP
          </button>

          <div className="text-center">
            <span className="text-gray-400">Go back to sign in?</span>{" "}
            <Link href="#" className="text-[#4169e1]">
              Sign in
            </Link>
          </div>
        </div>
      </div>
   
  );
}
