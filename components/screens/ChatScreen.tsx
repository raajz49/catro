"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MessageCircle, Send, Smile, SkipForward, Phone } from "lucide-react";
import { countries } from "@/types/globalTypes";
import { ChatHook } from "@/types/chatType";
type ChatScreenProps = {
  selectedCountry: string;
  setSelectedCountry: (code: string) => void;
  onEndChat: () => void;
  onSkipChat: () => void;
  chat: ChatHook;
};

export const ChatScreen: React.FC<ChatScreenProps> = ({
  selectedCountry,
  setSelectedCountry,
  chat,
}) => {
  const {
    messages,
    newMessage,
    isTyping,
    strangerTyping,
    messagesEndRef,
    sendMessage,
    handleTyping,
  } = chat;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: Date) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);

  return (
    <div className="bg-gray-900 p-4">
      <div className=" ">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] bg-gray-800 border-gray-700 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 opacity-70 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {strangerTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 px-4 py-2 rounded-2xl flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-24 min-h-[48px]"
                    rows={1}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="h-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              {isTyping && (
                <p className="text-xs text-gray-500 mt-2">You are typing...</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
