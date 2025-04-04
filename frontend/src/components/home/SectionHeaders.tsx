import React from "react";
import { Badge } from "../ui/badge";

interface SectionHeadersProps {
  badge: string;
  description: string;
  title1: string;
  title2: string;
}

const SectionHeaders = ({
  badge,
  description,
  title1,
  title2,
}: SectionHeadersProps) => {
  return (
    <div>
      <div className="text-center mb-12 z-30 ">
        <Badge className="bg-[rgb(37,150,190)]/20 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/30 px-4 py-1 text-sm mb-4">
          {badge}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gray-900 dark:text-white">{title1} </span>
          <span className="bg-gradient-to-r from-[rgb(37,150,190)] to-purple-600 text-transparent bg-clip-text">
            {title2}
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionHeaders;
