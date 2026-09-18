"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type FormType = "sign-up" | "sign-in";

const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, { message: "Name must be at least 3 characters" })
        : z.string().optional(),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

const features = [
  { icon: BookOpen, label: "20,000+ Expert-led Courses" },
  { icon: Users, label: "500K+ Active Learners" },
  { icon: Award, label: "Industry-recognized Certificates" },
  { icon: Star, label: "Lifetime Access to Content" },
];

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        await register(values).unwrap();
        toast.success("Please check your email to activate your account");
        router.push("/verify-account");
      } else {
        await login(values).unwrap();
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const isSignIn = type === "sign-in";

  const handleManualLogin = (role: string) => {
    if (role === "admin") {
      form.setValue("email", process.env.NEXT_PUBLIC_ADMIN_EMAIL as string);
      form.setValue(
        "password",
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string,
      );
    } else {
      form.setValue("email", process.env.NEXT_PUBLIC_USER_EMAIL as string);
      form.setValue(
        "password",
        process.env.NEXT_PUBLIC_USER_PASSWORD as string,
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0C111B]">
      {/* Left Panel — decorative, hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0C111B] via-[#131c36] to-[#0C111B] flex-col justify-between p-12">
        {/* Blobs */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-[rgb(37,150,190)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />

        {/* Logo */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            E<span className="text-[rgb(37,150,190)]">Learning</span>
          </Link>
        </div>

        {/* Middle Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8 relative z-10"
        >
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              {isSignIn ? "Welcome back!" : "Start learning today."}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {isSignIn
                ? "Pick up right where you left off. Your courses are waiting for you."
                : "Join thousands of learners building real skills with expert instructors."}
            </p>
          </div>

          <ul className="space-y-4">
            {features.map(({ icon: Icon, label }, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <div className="flex-shrink-0 bg-[rgb(37,150,190)]/15 p-2 rounded-lg">
                  <Icon className="h-4 w-4 text-[rgb(37,150,190)]" />
                </div>
                <span className="text-sm">{label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom quote */}
        <p className="text-gray-600 text-sm relative z-10">
          © 2026 ELearning Platform. All rights reserved.
        </p>
      </div>

      {/* Right Panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              E<span className="text-[rgb(37,150,190)]">Learning</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isSignIn ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {isSignIn
                ? "Welcome back! Please enter your credentials."
                : "Start your learning journey today. It's free."}
            </p>
          </div>

          {/* Quick login buttons for demo */}
          {isSignIn && (
            <div className="flex gap-3 mb-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleManualLogin("admin")}
                className="flex-1 cursor-pointer border border-[rgb(37,150,190)]/40 text-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/10 text-xs"
              >
                Demo Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleManualLogin("user")}
                className="flex-1 cursor-pointer border border-purple-400/40 text-purple-500 hover:bg-purple-500/10 text-xs"
              >
                Demo User
              </Button>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 form"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Your full name"
                  type="text"
                />
              )}
              <FormField
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                type="email"
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="At least 6 characters"
                type="password"
              />

              <Button
                className="w-full py-6 text-base font-semibold mt-2 rounded-full bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/90 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                type="submit"
                disabled={isLoading || loginLoading}
              >
                {isLoading || loginLoading ? (
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <span className="flex items-center gap-2">
                    {isSignIn ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <div className="flex items-center my-5">
            <Separator className="flex-1" />
            <span className="px-4 text-xs text-gray-400 uppercase tracking-wider">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          {/* Google Sign-In */}
          <Button
            onClick={() => {
              setIsGoogleLoading(true);
              signIn("google", { callbackUrl: "/" });
            }}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-5 border-gray-200 dark:border-gray-700 hover:border-[rgb(37,150,190)]/40 transition-colors cursor-pointer"
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            )}
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
              {isSignIn ? "Sign in with Google" : "Sign up with Google"}
            </span>
          </Button>

          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="text-[rgb(37,150,190)] font-semibold hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;
