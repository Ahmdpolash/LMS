"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="cursor-pointer hover:text-dark-900 relative flex h-9 lg:h-10 w-9 lg:w-10 items-center justify-center rounded-full border border-gray-400 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      onClick={toggleTheme}
      // className="rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="h-[24px] w-[24px]" key="sun" />
      ) : (
        <Moon className="h-[24px] w-[24px]" key="moon" />
      )}
    </button>
  );
};

export default ThemeToggle;
