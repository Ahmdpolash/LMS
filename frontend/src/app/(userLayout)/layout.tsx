import "../globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/home/Footer";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className={`  bg-gray-50 dark:bg-[#0C111B]  dark:bg-gradient-to-r from-[#0C111B] to-[#131c36] `}
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

//bg-gradient-to-b from-white to-gray-50 dark:from-[#0C111B] dark:to-[#131c36]

// /bg-gray-50 dark:bg-[#0C111B]

//overflow-x-hidden !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300

// bg-gray-50 dark:bg-[#0C111B]  dark:bg-gradient-to-r from-[#0C111B] to-[#131c36] (main root color)

//bg-white dark:bg-[#0C111B]
