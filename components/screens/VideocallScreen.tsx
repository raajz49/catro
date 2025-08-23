"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Video,
  Phone,
  SkipForward,
  Users,
  VideoOff,
  Mic,
  MicOff,
  Maximize,
  Minimize,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { countries } from "@/types/globalTypes";

interface VideoCallScreenProps {
  onEndCall: () => void;
  onSkipCall: () => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  videoCall: any;
}

export const VideoCallScreen: React.FC<VideoCallScreenProps> = ({
  selectedCountry,
  setSelectedCountry,
  onEndCall,
  onSkipCall,
  videoCall,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const remoteStream = videoCall.remoteStream;

  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLocalVideoMinimized, setIsLocalVideoMinimized] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [isLocalBig, setIsLocalBig] = useState(true); // true = local is big

  // Init camera + mic
  useEffect(() => {
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setIsVideoEnabled(true);
        setIsAudioEnabled(true);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError("Could not access camera/microphone");
      }
    }
    initMedia();

    return () => {
      localStream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Attach remote stream
  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  // Swap big and PiP
  const swapVideos = () => setIsLocalBig((prev) => !prev);

  // Resize PiP
  const toggleLocalVideoSize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLocalVideoMinimized(!isLocalVideoMinimized);
  };

  // Auto-hide controls
  useEffect(() => {
    if (showSettings) {
      // If country popover is open, always show controls
      setShowControls(true);
      return;
    }

    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls, showSettings]);

  const handleMouseMove = () => setShowControls(true);

  return (
    <div className="bg-gray-800 mt-4 rounded-lg">
      <div
        className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
      >
        {/* Local video */}
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={`absolute object-cover transition-all duration-300 ${
            isLocalBig
              ? "inset-0 w-full h-full z-10"
              : `${
                  isLocalVideoMinimized
                    ? "top-4 right-4 w-24 h-32"
                    : "top-6 right-6 w-48 h-64"
                } rounded-xl overflow-hidden shadow-2xl  z-30`
          }`}
          onClick={swapVideos}
        />

        {/* Local camera off placeholder (works for both big and PiP) */}
        {!isVideoEnabled && (
          <div
            className={`absolute flex flex-col items-center justify-center bg-black text-gray-400 transition-all duration-300 ${
              isLocalBig
                ? "inset-0 z-20"
                : `${
                    isLocalVideoMinimized
                      ? "top-4 right-4 w-24 h-32"
                      : "top-6 right-6 w-48 h-64"
                  } rounded-xl z-40`
            }`}
            onClick={swapVideos}
          >
            <VideoOff className="w-6 h-6 mb-1" />
            <p className="text-xs">Camera Off</p>
          </div>
        )}

        {/* Remote video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className={`absolute object-cover transition-all duration-300 ${
            !isLocalBig
              ? "inset-0 w-full h-full z-10"
              : `${
                  isLocalVideoMinimized
                    ? "top-4 right-4 w-24 h-32"
                    : "top-6 right-6 w-48 h-64"
                } rounded-xl overflow-hidden shadow-2xl z-30`
          }`}
          onClick={swapVideos}
        />

        {/* Remote placeholder */}
        {!remoteStream && (
          <div
            className={`absolute flex flex-col items-center justify-center bg-gray-800 text-gray-400 transition-all duration-300 ${
              !isLocalBig
                ? "inset-0 z-20"
                : `${
                    isLocalVideoMinimized
                      ? "top-4 right-4 w-24 h-32"
                      : "top-6 right-6 w-48 h-64"
                  } rounded-xl z-40`
            }`}
            onClick={swapVideos}
          >
            <Users className="w-6 h-6 mb-1" />
            <p className="text-xs">Connecting...</p>
          </div>
        )}

        {/* Minimize/Maximize for PiP */}
        {/* <button
          onClick={toggleLocalVideoSize}
          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-50"
        >
          {isLocalVideoMinimized ? (
            <Maximize className="w-3 h-3" />
          ) : (
            <Minimize className="w-3 h-3" />
          )}
        </button> */}

        {/* Error */}
        {error && (
          <div className="absolute top-20 left-6 right-6 z-50">
            <Card className="p-4 bg-red-900/80 backdrop-blur-sm border-red-700">
              <p className="text-red-300 text-sm">{error}</p>
            </Card>
          </div>
        )}

        {/* Bottom Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
            showControls
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="flex items-center justify-center space-x-6">
              {/* Video toggle */}
              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  isVideoEnabled
                    ? "bg-white/20 backdrop-blur-sm text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {isVideoEnabled ? (
                  <Video className="w-6 h-6" />
                ) : (
                  <VideoOff className="w-6 h-6" />
                )}
              </button>

              {/* Audio toggle */}
              <button
                onClick={toggleAudio}
                className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  isAudioEnabled
                    ? "bg-white/20 backdrop-blur-sm text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {isAudioEnabled ? (
                  <Mic className="w-6 h-6" />
                ) : (
                  <MicOff className="w-6 h-6" />
                )}
              </button>

              {/* Skip */}
              <button
                onClick={onSkipCall}
                className="p-4 rounded-full bg-gray-600/80 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 hover:bg-gray-500/80"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              {/* End call */}
              <button
                onClick={onEndCall}
                className="p-6 rounded-full bg-red-500 text-white transition-all duration-300 hover:scale-110 hover:bg-red-600 shadow-lg"
              >
                <Phone className="w-7 h-7 rotate-[135deg]" />
              </button>

              {/* Country selector */}
              <Popover open={showSettings} onOpenChange={setShowSettings}>
                <PopoverTrigger asChild>
                  <button className="p-6 w-20 h-20 rounded-full bg-gray-600/80 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 hover:bg-gray-500/80 flex items-center justify-center">
                    <span className="text-[2rem]">
                      {countries.find((c) => c.code === selectedCountry)
                        ?.flag ?? "🌍"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  className="bg-gray-900 border border-gray-700 text-white p-2 w-full max-h-48 overflow-y-auto"
                >
                  <div className="grid grid-cols-8 gap-2">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country.code);
                          setShowSettings(false);
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                          selectedCountry === country.code
                            ? "bg-blue-600/80"
                            : "hover:bg-gray-800"
                        }`}
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-xs font-medium">
                          {country.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Toggle controls */}
        <div
          className="absolute inset-0 z-10"
          onClick={() => setShowControls(!showControls)}
        />
      </div>
    </div>
  );
};
