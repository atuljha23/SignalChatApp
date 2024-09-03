"use client";
import { useAppStore } from "@/store";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

function withAuth<T extends Record<string, unknown>>(
  Component: NextComponentType<T>
) {
  const Auth = (props: T) => {
    const { userInfo } = useAppStore();
    const isLoggedIn = userInfo !== undefined;
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/auth");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null; // Ensure the component does not render while redirecting
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export { withAuth };
