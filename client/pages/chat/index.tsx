import React, { useEffect } from "react";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useAppStore } from "@/store";

function Chat() {
  const { userInfo } = useAppStore();
  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/auth";
    }
  }, [userInfo]);

  return (
    userInfo && (
      <div className="flex h-[100vh] overflow-hidden">
        <ContactsContainer />
        {/* <EmptyChatContainer /> */}
        <ChatContainer />
      </div>
    )
  );
}

export default Chat;
