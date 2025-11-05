"use client";
import { useAppSelector } from "@/redux/hooks";

export default function UserAuth() {
  const { user } = useAppSelector((state) => state.auth);

  // const user = localStorage.getItem("accessToken");

  if (user) {
    return true;
  } else {
    return false;
  }
}
