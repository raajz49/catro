import { useState, useRef, RefObject } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "stranger";
  timestamp: Date;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [strangerTyping, setStrangerTyping] = useState<boolean>(false);

  const messagesEndRef: RefObject<HTMLDivElement | null> = useRef(null);

  // Add message to chat
  const addMessage = (
    text: string,
    sender: "user" | "stranger" = "user",
    timestamp: Date = new Date()
  ) => {
    const message: Message = {
      id: Date.now() + Math.random(),
      text,
      sender,
      timestamp,
    };
    setMessages((prev) => [...prev, message]);

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Simulate stranger typing
  const simulateStrangerTyping = () => {
    setStrangerTyping(true);
    setTimeout(() => {
      setStrangerTyping(false);
      const strangerMessages = [
        "Hello there! 👋",
        "How are you doing?",
        "Nice to meet you!",
        "What's your favorite hobby?",
        "The weather is great today!",
        "Where are you from?",
        "Have a great day! 😊",
      ];
      const randomMessage =
        strangerMessages[Math.floor(Math.random() * strangerMessages.length)];
      addMessage(randomMessage, "stranger");
    }, Math.random() * 3000 + 1000);
  };

  // Send message
  const sendMessage = () => {
    if (newMessage.trim()) {
      addMessage(newMessage, "user");
      setNewMessage("");
      setIsTyping(false);

      // Simulate stranger response (30% chance)
      if (Math.random() < 0.3) {
        setTimeout(simulateStrangerTyping, Math.random() * 2000 + 500);
      }
    }
  };

  // Handle typing
  const handleTyping = (value: string) => {
    setNewMessage(value);
    setIsTyping(value.length > 0);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([]);
    setNewMessage("");
    setIsTyping(false);
    setStrangerTyping(false);
  };

  return {
    messages,
    newMessage,
    isTyping,
    strangerTyping,
    messagesEndRef,
    addMessage,
    sendMessage,
    handleTyping,
    clearChat,
  };
};
