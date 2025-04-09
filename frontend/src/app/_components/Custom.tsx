"use client";

import { useCurrentUserQuery } from "@/redux/api/baseApi";
import React from "react";
import Loading from "../(auth)/loading";

const Custom = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useCurrentUserQuery({});

  return <>{isLoading ? <Loading /> : <>{children}</>}</>;
};

export default Custom;
