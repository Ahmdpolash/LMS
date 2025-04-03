import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";

const Login = () => {
  return (
    <div>
      <TabsContent value="signin" className="space-y-4 pt-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-200">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="bg-[#1e293b] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-200"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            className="bg-[#1e293b] border-gray-700 text-white"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded bg-[#1e293b] border-gray-700"
            />
            Remember me
          </label>
          <a
            href="#"
            className="text-sm text-[rgb(37,150,190)] hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Button className="w-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white">
          Login
        </Button>

        {/* Google Login Button */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-[#111827] text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Login with Google
        </Button>
      </TabsContent>
    </div>
  );
};

export default Login;
