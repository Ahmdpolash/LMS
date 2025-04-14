"use client";


import React from "react";
import { useAppSelector } from "@/redux/hooks";

import { redirect } from "next/navigation";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth) as {
    user: { role: string } | null;
  };

  if (user) {
    const isAdmin = user?.role === "admin";
    return isAdmin ? children : redirect("/");
  }
}
