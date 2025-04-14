"use client";

import * as React from "react";
import {
  ChartLine,
  Cog,
  LayoutDashboard,
  SquarePlay,
  UserCog,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },

    {
      title: "Data",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "#",
        },

        {
          title: "Invoices",
          url: "#",
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      icon: SquarePlay,
      isActive: true,
      items: [
        {
          title: "Create Course",
          url: "#",
        },

        {
          title: "Live Courses",
          url: "#",
        },
      ],
    },
    {
      title: "Customization",
      url: "#",
      icon: Cog,
      isActive: true,
      items: [
        {
          title: "Create Course",
          url: "#",
        },

        {
          title: "Live Courses",
          url: "#",
        },
      ],
    },
    {
      title: "Controllers",
      url: "#",
      icon: UserCog,
      isActive: true,
      items: [
        {
          title: "Manage Team",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
      isActive: false,
      items: [
        {
          title: "Users Analytics",
          url: "#",
        },
        {
          title: "Course Analytics",
          url: "#",
        },
        {
          title: "Orders Analytics",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"} className="cursor-pointer">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
