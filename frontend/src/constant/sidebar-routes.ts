import {
  Home,
  Book,
  Settings,
  Shield,
  Users,
  BarChart2,
  LogOut,
  Lock,
  SquareUser,
  LayoutDashboard,
} from "lucide-react";

const sidebarRoutes = {
  user: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Profile",
      path: "/dashboard/my-profile",
      icon: SquareUser,
    },
    {
      title: "Enrolled Courses",
      path: "/courses",
      icon: Book,
    },
    {
      title: "Change Password",
      path: "/change-password",
      icon: Lock,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Admin Panel",
      path: "/admin",
      icon: Shield,
    },
    {
      title: "User Management",
      path: "/admin/users",
      icon: Users,
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: BarChart2,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      title: "Logout",
      path: "/logout",
      icon: LogOut,
    },
  ],
};

export default sidebarRoutes;
