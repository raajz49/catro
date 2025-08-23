import { RefObject } from "react";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "stranger";
  timestamp: Date;
};

// in ChatScreen.tsx (your shared type file)
export type ChatHook = {
  messages: Message[];
  newMessage: string;
  isTyping: boolean;
  strangerTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>; // <-- allow null here
  addMessage: (
    text: string,
    sender?: "user" | "stranger",
    timestamp?: Date
  ) => void;
  sendMessage: () => void;
  handleTyping: (value: string) => void;
  clearChat: () => void;
};
