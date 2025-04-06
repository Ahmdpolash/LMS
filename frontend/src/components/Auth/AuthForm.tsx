"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormField from "./FormField";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import Container from "../shared/Container";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";

type FormType = "sign-up" | "sign-in";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, {
            message: "Name must be at least 3 characters",
          })
        : z.string().optional(),
    email: z
      .string()
      .email({ message: "Please enter your valid email address" }),
    password: z.string().min(3, {
      message: "password must be at least 4 digits",
    }),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [register, { isLoading, data, isSuccess }] = useRegisterMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data?.message) {
      toast.success(data.message);
      router.push("/verify-account");
    }
  }, [isSuccess, data, router]);

  // 1. Define your form.
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        await register(values).unwrap();
      } else {
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="grid place-items-center h-screen mx-auto w-full lg:max-w-6xl  ">
      <Container>
        <div className="  w-full  lg:min-w-[500px] px-5">
          <div className="border border-blue-300/50 flex flex-col gap-6 card py-4 lg:py-5 px-5 lg:px-7">
            <div className="flex flex-row gap- justify-cente">
              {/* <Image src="/logo.svg" alt="logo" height={32} width={38} /> */}
              <h2 className="text-primary-100 text-balance">E-Learning</h2>
            </div>

            <p className="text-[17px] text-slate-400">
              {isSignIn
                ? "Welcome back! Please enter your details."
                : "Create an account to get started."}
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 mt-4 form"
              >
                {!isSignIn && (
                  <FormField
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Your Name"
                    type="text"
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Your email address"
                  type="email"
                />

                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />

                <Button className="btn" type="submit">
                  {isLoading
                    ? "Processing..."
                    : isSignIn
                    ? "Sign In"
                    : "Create an Account"}
                </Button>
              </form>
            </Form>

            <div className="flex items-center my-1">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Google Sign-In Button */}
            <Button
              variant="outline"
              className="cursor-pointer w-full flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
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
              {isSignIn ? "Sign in with Google" : "Sign up with Google"}
            </Button>

            <p className="text-center">
              {isSignIn
                ? "If you don't have any account ? Please"
                : "Have an account already?"}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="font-bold text-user-primary ml-1"
              >
                {!isSignIn ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthForm;
