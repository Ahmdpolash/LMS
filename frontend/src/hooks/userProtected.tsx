"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/redux/api/baseApi";
import CustomLoading from "@/app/_components/CustomLoading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { data: currentUserData, isLoading, isFetching } = useCurrentUserQuery({});

  const user = currentUserData?.data || authUser;

  useEffect(() => {
    if (!isLoading && !isFetching && !user) {
      router.replace("/sign-in");
    }
  }, [user, isLoading, isFetching, router]);

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <CustomLoading />
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <CustomLoading />
    </div>
  );
}
