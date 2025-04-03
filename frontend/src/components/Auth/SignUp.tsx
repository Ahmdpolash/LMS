"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "../ui/button";
import FormField from "./FormField";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Otp from "./Otp";

const authFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),

  email: z.string().email({ message: "Please enter your valid email address" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

const SignUp = ({ setActiveTab }: any) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // Redirect to Signin tab after successful signup

    // setActiveTab("signin");

    setOtpSent(true);
  }

  function verifyOtp() {
    if (otp === "1234") {
      console.log("OTP Verified!");
      setActiveTab("login"); // Redirect to login after successful OTP verification
    } else {
      alert("Invalid OTP, try again.");
    }
  }
  return (
    <div>
      <TabsContent value="signup" className="space-y-4 pt-2">
        <Form {...form}>
          {!otpSent ? (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
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

              <Button
                type="submit"
                className="w-full my-2 bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white"
              >
                Create Account
              </Button>
            </form>
          ) : (
            <Otp />
          )}
        </Form>
      </TabsContent>
    </div>
  );
};

export default SignUp;
