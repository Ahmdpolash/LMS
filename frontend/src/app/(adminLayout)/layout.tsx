import "../globals.css";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "../_components/admin/Header";
import AdminProtectedRoute from "@/hooks/adminProtected";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className=" font-poppins bg-white dark:bg-[#121A3A] ">
     
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/*side header and children */}
            <Header />
            <div className="px-2 lg:px-5 z-10 pt-5  dark:bg-[#0C111B] min-h-screen">
              <AdminProtectedRoute>{children}</AdminProtectedRoute>
              {/* {children} */}
            </div>
          </SidebarInset>
        </SidebarProvider>
      
    </div>
  );
}

//dark:bg-[#0C111B]
