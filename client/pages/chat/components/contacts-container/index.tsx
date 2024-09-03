import React from "react";
import logoAnimated from "@/assets/lotties/logo-signal.json";
import Lottie from "lottie-react";
import ProfileInfoComponent from "./components/profile-info";
import NewDM from "./components/new-dm";

function ContactsContainer() {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[29vw] border-r-2 border-cyan-800 w-full">
      <div className="flex items-center">
        <Lottie
          className="h-[50px] md:h-[150px] dark:text-white"
          animationData={logoAnimated}
          loop={true}
        />
        <p className="text-xl md:text-2xl lg:text-4xl text-black dark:text-white font-bold inter-var text-center">
          Signal Chat
        </p>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <div>
        <ProfileInfoComponent />
      </div>
    </div>
  );
}

const Title = ({ text }: { text: string }) => {
  return (
    <p className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </p>
  );
};

export default ContactsContainer;
