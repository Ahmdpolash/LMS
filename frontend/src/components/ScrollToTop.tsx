"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-9 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
