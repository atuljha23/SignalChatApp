import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

function MessageBar() {
  const [message, setMessage] = React.useState("");
  const emojiRef = React.useRef<HTMLDivElement>(null);
  const [emojiPickerOpen, setemojiPickerOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setemojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddEmoji = (emoji: any) => {
    setMessage((prev) => `${prev}${emoji.emoji}`);
  };

  const handleEmojiClick = () => {
    setemojiPickerOpen((prev) => !prev);
  };

  return (
    <div className="bg-black/10 h-[5vh] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="flex-1 p-5 focus:outline-none focus:border-none rounded-md bg-transparent text-white"
        />
        <div className="flex  gap-4 justify-center items-center">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-black dark:focus:text-white duration-300 transition-all">
            <GrAttachment className="text-2xl" />
          </button>
          <div className="relative">
            <button
              onClick={handleEmojiClick}
              className="text-neutral-500 focus:border-none focus:outline-none focus:text-black dark:focus:text-white duration-300 transition-all"
            >
              <RiEmojiStickerLine className="text-2xl" />
            </button>
            <div ref={emojiRef} className="absolute bottom-16 right-0">
              <EmojiPicker
                // @ts-ignore-next-line
                theme="dark"
                autoFocusSearch={false}
                onEmojiClick={handleAddEmoji}
                open={emojiPickerOpen}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="bg-purple-600 hover:bg-purple-800 focus:bg-purple-900 rounded-md flex items-center justify-center p-4 focus:border-none focus:outline-none focus:text-black dark:focus:text-white duration-300 transition-all">
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
}

export default MessageBar;
