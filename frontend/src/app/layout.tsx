
import React, { ReactNode } from "react";



const layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
};

export default layout;
