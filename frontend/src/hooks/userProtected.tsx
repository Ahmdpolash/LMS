import React from "react";
import UserAuth from "./userAuth";
import { redirect } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : redirect("/");
}
