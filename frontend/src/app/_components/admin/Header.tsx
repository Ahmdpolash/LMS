"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "./BreadCrumbs";
import ThemeToggle from "../ThemeToggle";
import Notification from "./Notification";
import { useAppSelector } from "@/redux/hooks";

const Header = () => {
  const { user } = useAppSelector(
    (state: { auth: { user: { avatar?: { url?: string } } | null } }) =>
      state.auth
  );

  return (
    <header className="sticky bg-white dark:bg-[#101828] top-0 z-30 border-b dark:border-slate-700 border-slate-300 shadow-sm flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1  " />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadCrumbs />
      </div>

      <div className="flex items-center gap-x-2 md:gap-x-4 mr-5">
        <ThemeToggle />
        <Notification />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar?.url} alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard/my-profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
