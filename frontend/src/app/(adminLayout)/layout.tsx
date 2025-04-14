"use client";
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";
import { ReactNode } from "react";
import ThemeToggle from "../_components/ThemeToggle";
import Notification from "../_components/admin/Notification";
import { usePathname } from "next/navigation";
import { AdminSidebarItem } from "@/constant";
import { generateBreadcrumbs } from "@/app/_components/GenerateBreadCrumbs";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className=" font-poppins bg-white dark:bg-[#0C111B]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky bg-white dark:bg-[#101828] top-0 z-30 border-b dark:border-slate-700 border-slate-300 shadow-sm flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1  " />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center">
                      {index < breadcrumbs.length - 1 ? (
                        <>
                          <BreadcrumbItem>
                            <BreadcrumbLink href={crumb.url || "#"}>
                              {crumb.title}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                        </>
                      ) : (
                        <BreadcrumbItem>
                          <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-4 mr-5">
              <ThemeToggle />
              <Notification />
            </div>
          </header>
          <div className="px-2 lg:px-5 z-10 pt-5">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

//bg-gradient-to-b from-white to-gray-50 dark:from-[#0C111B] dark:to-[#131c36]

// /bg-gray-50 dark:bg-[#0C111B]

//overflow-x-hidden !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300

// bg-gray-50 dark:bg-[#0C111B]  dark:bg-gradient-to-r from-[#0C111B] to-[#131c36] (main root color)

//bg-white dark:bg-[#0C111B]
