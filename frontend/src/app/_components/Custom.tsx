"use client";

import { useCurrentUserQuery } from "@/redux/api/baseApi";
import React, { useEffect } from "react";
import Loading from "../(auth)/loading";

import socketIO from "socket.io-client";
import { getSocketUrl } from "@/utils/endpoints";

const socketId = socketIO(getSocketUrl(), { transports: ["websocket"] });

const Custom = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    socketId.connect();
  }, []);

  const { isLoading } = useCurrentUserQuery({});

  return <>{isLoading ? <Loading /> : <>{children}</>}</>;
};

export default Custom;
