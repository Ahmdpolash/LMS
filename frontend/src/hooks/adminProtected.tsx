"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/redux/api/baseApi";
import CustomLoading from "@/app/_components/CustomLoading";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user: authUser } = useAppSelector((state) => state.auth) as {
    user: { role: string } | null;
  };
  const { data: currentUserData, isLoading, isFetching } = useCurrentUserQuery({});

  const user = currentUserData?.data || authUser;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isLoading && !isFetching) {
      if (!user) {
        router.replace("/sign-in");
      } else if (!isAdmin) {
        router.replace("/");
      }
    }
  }, [user, isAdmin, isLoading, isFetching, router]);

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <CustomLoading />
      </div>
    );
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <CustomLoading />
    </div>
  );
}
