"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/lib/constants";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmpassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    // Confirm password must match password.
  })
  .superRefine(({ confirmpassword, password }, ctx) => {
    if (confirmpassword !== password) {
      ctx.addIssue({
        message: "Passwords must match.",
        code: z.ZodIssueCode.custom,
        path: ["confirmpassword"],
      });
    }
  });

function SignUp() {
  const { setUserInfo } = useAppStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await apiClient
      .post(
        SIGNUP_ROUTE,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data)
      .catch((err) => err.response.data);
    if ((response.status = 201)) {
      setUserInfo(response.data.user);
      router.push("/profile");
    }
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="bajooka@signalChat.com" {...field} />
                </FormControl>
                <FormDescription>This is your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  This is your private password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>Confirm your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full rounded-xl" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
