"use client";
import type { AppProps } from "next/app";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/lib/dark-mode";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import { GET_USER_INFO } from "@/lib/constants";
import { useAppStore } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
    }
  }, [userInfo, setUserInfo]);
  return (
    <ThemeProvider>
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
