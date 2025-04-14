"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { useAppSelector } from "@/redux/hooks";

import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { TUser } from "@/types";
import { AdminSidebarItem } from "@/constant";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"} className="cursor-pointer">
          <div className="flex items-center gap-2 border-b border-slate-400 dark:border-slate-600 pb-1.5">
            <Image
              src={"/logo2.png"}
              height={80}
              width={80}
              alt="logo"
              className="w-[50px]"
            />

            <h3 className="pt-1 font-bold transition-all duration-300 group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
              ELearning
            </h3>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavProjects projects={data.projects} /> */}
        <NavMain items={AdminSidebarItem.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
