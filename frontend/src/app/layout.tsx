import { Toaster } from "@/components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
        <HotToaster />
      </body>
    </html>
  );
};

export default layout;
