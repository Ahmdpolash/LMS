"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import { redirect, useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import jwt, { JwtPayload } from "jsonwebtoken";

// export default function AdminProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     router.push("/sign-in");
//   } else {
//     try {
//       const user = jwt.decode(token) as JwtPayload;
//       const isAdmin = user?.role === "admin";
//       if (!isAdmin) {
//         redirect("/");
//       }

//       return children;
//     } catch (error) {
//       // Handle invalid token
//       localStorage.removeItem("accessToken");
//       router.push("/sign-in");
//     }
//   }
// }
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
