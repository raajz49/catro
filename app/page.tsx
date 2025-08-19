"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, Phone, SkipForward, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleStartCall = () => {
    setIsConnecting(true);
    console.log("Starting video call...");

    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsCallActive(true);
      console.log("Connected to stranger!");
    }, 2000);
  };

  const handleEndCall = () => {
    console.log("Ending call...");
    setIsCallActive(false);
  };

  const handleSkipCall = () => {
    console.log("Skipping to next call...");
    setIsConnecting(true);

    // Simulate finding new connection
    setTimeout(() => {
      setIsConnecting(false);
      console.log("Connected to new stranger!");
    }, 1500);
  };

  if (!isCallActive && !isConnecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4 pulse-animation">
              <Video className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ChatSpark
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with strangers around the world through video chat
            </p>
          </div>

          <Card className="p-8 mb-6 bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-primary mr-3" />
              <span className="text-foreground font-medium">
                Ready to connect
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Click the button below to start a random video chat with someone
              new
            </p>

            <Button
              onClick={handleStartCall}
              className="w-full h-14 text-lg font-semibold call-button-primary rounded-xl"
              size="lg"
            >
              <Video className="w-6 h-6 mr-3" />
              Start Video Call
            </Button>
          </Card>

          <p className="text-xs text-muted-foreground">
            By using ChatSpark, you agree to be respectful and follow community
            guidelines
          </p>
        </div>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 pulse-animation">
            <Video className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Connecting...</h2>
          <p className="text-muted-foreground mb-6">
            Finding someone to chat with
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 fade-in">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary mr-3">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">ChatSpark</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Connected</span>
        </div>
      </div>

      {/* Video Layout */}
      <div className="max-w-6xl mx-auto slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Remote Video - Main Stream */}
          <div className="lg:col-span-3">
            <Card className="video-container aspect-video lg:aspect-[16/10] w-full">
              <div className="video-placeholder w-full h-full flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Stranger's Video
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Waiting for video stream...
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Local Video - Your Stream */}
          <div className="lg:col-span-1">
            <Card className="video-container aspect-video w-full">
              <div className="video-placeholder w-full h-full flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-sm font-medium mb-1">Your Camera</h4>
                  <p className="text-xs text-muted-foreground">Video preview</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call Controls */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border border-border/50">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* <Button
              onClick={handleSkipCall}
              variant="secondary"
              size="lg"
              className="h-12 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              disabled={isConnecting}
            >
              <SkipForward className="w-5 h-5 mr-2" />
              Next
            </Button> */}

            <Button
              onClick={handleSkipCall}
              variant="secondary"
              size="lg"
              className="h-12 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              disabled={isConnecting}
            >
              <SkipForward className="w-5 h-5 mr-2" />
              Skip
            </Button>

            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="lg"
              className="h-12 px-8 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2 rotate-[135deg]" />
              End Call
            </Button>
          </div>

          <div className="flex items-center justify-center mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Use "Next" or "Skip" to connect with a new person • "End Call" to
              return to start
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
