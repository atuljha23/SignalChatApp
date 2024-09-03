"use client";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import helloAnimated from "@/assets/lotties/hello.json";
import Login from "@/components/auth/login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "@/components/auth/signup";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";

function Auth() {
  const { userInfo } = useAppStore();
  const router = useRouter();
  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      router.push("/profile");
    }
    if (userInfo && userInfo.profileSetup) {
      router.push("/chat");
    }
  }, [userInfo, router]);
  return (
    !userInfo && (
      <div>
        <div className="flex m-4 items-center justify-center">
          <div className="items-center p-4 flex flex-col border-2 shadow-2xl rounded-3xl h-[80vh] w-[80-vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw]">
            <Lottie
              className="h-[150px] dark:text-white"
              animationData={helloAnimated}
              loop={true}
            />
            <h1 className="text-4xl font-bold text-center">
              Welcome to Signal
            </h1>
            <p className="text-lg text-center">
              The chat app that respects your privacy
            </p>
            <div className="flex items-center mt-4 justify-center w-full">
              <Tabs className="w-3/4" defaultValue="signin">
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger
                    className="data-[state=active]:bg-transparent text-black dark:text-white text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-500"
                    value="signin"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-transparent text-black dark:text-white text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-500"
                    value="signup"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <Login />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUp />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Auth;
