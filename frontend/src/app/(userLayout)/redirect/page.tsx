"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSocialLoginMutation } from "@/redux/features/auth/authApi";

export default function RedirectPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [socialAuth, { isSuccess }] = useSocialLoginMutation();

  useEffect(() => {
    if (session?.user?.email) {
      socialAuth({
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
      });
    }
  }, [session]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="ml-4 text-lg">Authenticating...</p>
    </div>
  );
}
