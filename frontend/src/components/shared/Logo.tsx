"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
};

export default function Logo({
  className = "",
  size = "md",
  href = "/",
}: LogoProps) {
  const imageSizes = {
    sm: { width: 30, height: 30, className: "w-[28px] h-[28px]" },
    md: { width: 38, height: 38, className: "w-[36px] h-[36px]" },
    lg: { width: 46, height: 46, className: "w-[44px] h-[44px]" },
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  const currentSize = imageSizes[size] || imageSizes.md;

  const content = (
    <div
      className={`inline-flex items-center gap-2 select-none hover:opacity-90 transition-opacity ${className}`}
    >
      <Image
        src="/logo2.png"
        alt="ELearning Logo"
        width={currentSize.width}
        height={currentSize.height}
        className={`${currentSize.className} object-contain shrink-0`}
        priority
      />
      <span
        className={`${textSizes[size]} font-bold tracking-tight text-gray-900 dark:text-white`}
      >
        ELearning
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
