"use client";

import { useState, useEffect } from "react";
import { useVideoCall } from "@/hooks/use-videocall";
import { ConnectingScreen } from "@/components/screens/ConnectingScreen";
import { VideoCallScreen } from "@/components/screens/VideocallScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { useChat } from "@/hooks/use-chat";
import { ChatScreen } from "@/components/screens/ChatScreen";
import { CountryProvider, useCountry } from "@/context/CountryContext";

// Home Screen Component

// Main App Component
export default function ChatSparkApp() {
  const [appState, setAppState] = useState("home");
  const { selectedCountry, setSelectedCountry } = useCountry();
  const videoCall = useVideoCall();
  const chat = useChat();

  // Handle starting a call
  const handleStartCall = async () => {
    setAppState("connecting");

    try {
      // Initialize media
      await videoCall.initializeMedia();

      // Simulate connection process
      setTimeout(() => {
        videoCall.createPeerConnection();
        setAppState("calling");
        console.log("Connected to stranger in:", selectedCountry);
      }, 2000);
    } catch (error) {
      console.error("Failed to start call:", error);
      setAppState("home");
    }
  };

  const handleEndCall = () => {
    videoCall.cleanup();
    setAppState("home");
  };

  const handleSkipCall = () => {
    setAppState("connecting");

    setTimeout(() => {
      setAppState("calling");
      console.log("Connected to new stranger in:", selectedCountry);
    }, 1500);
  };

  const handleEndChat = () => {
    chat.clearChat();
    setAppState("home");
  };

  // Handle skipping to next chat
  const handleSkipChat = () => {
    setAppState("connecting");
    chat.clearChat();

    // Simulate finding new person for chat
    setTimeout(() => {
      setAppState("chatting");
      console.log("Connected to new stranger for chat in:", selectedCountry);

      // Send a welcome message from new stranger
      setTimeout(() => {
        const greetings = [
          "Hi there! 😊",
          "Hello! How are you?",
          "Hey! What's up?",
          "Hi! Nice to meet you! 👋",
        ];
        const randomGreeting =
          greetings[Math.floor(Math.random() * greetings.length)];
        chat.addMessage(randomGreeting, "stranger");
      }, 1000);
    }, 1500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      videoCall.cleanup();
    };
  }, []);

  // Render appropriate screen based on app state
  if (appState === "home") {
    return (
      <HomeScreen
        onStartCall={handleStartCall}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    );
  }

  if (appState === "connecting") {
    return <ConnectingScreen selectedCountry={selectedCountry} />;
  }
  if (appState === "calling" || appState === "chatting") {
    return (
      <CountryProvider>
        <div className="grid grid-cols-12 ">
          {/* Video side */}
          <div className="col-span-12 lg:col-span-8 pl-4">
            <VideoCallScreen
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              onEndCall={handleEndCall}
              onSkipCall={handleSkipCall}
              videoCall={videoCall}
            />
          </div>

          {/* Chat side */}
          <div className="col-span-12 lg:col-span-4">
            <ChatScreen
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              onEndChat={handleEndChat}
              onSkipChat={handleSkipChat}
              chat={chat}
            />
          </div>
        </div>
      </CountryProvider>
    );
  }

  return null;
}
