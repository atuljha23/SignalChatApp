"use client";
import { WavyBackground } from "@/components/ui/wavy-background";
import Lottie from "lottie-react";
import React from "react";
import helloManAnimated from "@/assets/lotties/hello-man.json";
import { useAppStore } from "@/store";

function EmptyChatContainer() {
  const { userInfo } = useAppStore();
  return (
    <div className="flex-1 md:flex flex-col justify-center items-center hidden transition-all duration-100">
      <Lottie
        className="h-[250px] m-8 dark:text-white"
        animationData={helloManAnimated}
        loop={true}
      />
      <p className="text-2xl md:text-4xl lg:text-7xl text-black dark:text-white font-bold inter-var text-center">
        Hi! {userInfo?.firstName} 👋
      </p>
      <p className="text-base md:text-xl mt-4 dark:text-white text-black font-normal inter-var text-center">
        Welcome to <span className="text-purple-500">Signal Chat</span>. Start
        by selecting a contact or creating a new chat.
      </p>
    </div>
  );
}

export default EmptyChatContainer;
