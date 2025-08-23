"use client";

import React, { useState, useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Video,
  Phone,
  SkipForward,
  Users,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  Settings,
  Maximize,
  Minimize,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { countries } from "@/types/globalTypes";

interface VideoCallScreenProps {
  onEndCall: () => void;
  onSkipCall: () => void;
  videoCall: {
    isVideoEnabled: boolean;
    isAudioEnabled: boolean;
    error: string | null;
    localVideoRef: RefObject<HTMLVideoElement | null>;
    remoteVideoRef: RefObject<HTMLVideoElement | null>;
    toggleVideo: () => void;
    toggleAudio: () => void;
    remoteStream: MediaStream | null;
  };
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
}

export const VideoCallScreen: React.FC<VideoCallScreenProps> = ({
  selectedCountry,
  setSelectedCountry,
  onEndCall,
  onSkipCall,
  videoCall,
}) => {
  const {
    isVideoEnabled,
    isAudioEnabled,
    error,
    localVideoRef,
    remoteVideoRef,
    toggleVideo,
    toggleAudio,
    remoteStream,
  } = videoCall;

  const [isLocalVideoMinimized, setIsLocalVideoMinimized] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSwapped, setIsSwapped] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCountryDialogOpen, setIsCountryDialogOpen] = useState(false);

  // Handle video swap
  const handleVideoSwap = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsSwapped(!isSwapped);
  };

  // Toggle local video size
  const toggleLocalVideoSize = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsLocalVideoMinimized(!isLocalVideoMinimized);
  };

  // Auto-hide controls after 3 seconds of inactivity
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  return (
    <div className=" bg-gray-800 mt-4 rounded-lg">
      {/* Main Video Container */}
      <div
        className="relative w-full h-[600px]  bg-black rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
      >
        {/* Background Video (Stranger's or User's based on swap) */}
        <div className="absolute inset-0">
          {!isSwapped ? (
            // Stranger's video as background
            remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 mb-6">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    Connecting to Stranger...
                  </h3>
                  <p className="text-gray-400">Waiting for video connection</p>
                </div>
              </div>
            )
          ) : (
            // User's video as background
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                !isVideoEnabled ? "hidden" : ""
              }`}
            />
          )}

          {/* Overlay for background video when camera is off or connecting */}
          {isSwapped && !isVideoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <VideoOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-xl">Camera is off</p>
              </div>
            </div>
          )}

          {!isSwapped && !remoteStream && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-xl">Connecting to Stranger...</p>
                <p className="text-gray-400 mt-2">
                  Waiting for video connection
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay Video (Picture-in-Picture) */}
        <div
          className={`absolute transition-all duration-300 cursor-pointer z-30 ${
            isLocalVideoMinimized
              ? "top-4 right-4 w-24 h-32"
              : "top-6 right-6 w-48 h-64"
          } rounded-xl overflow-hidden shadow-2xl border-2 border-white/20`}
          onClick={handleVideoSwap}
        >
          {!isSwapped ? (
            // User's video as overlay
            <>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  !isVideoEnabled ? "hidden" : ""
                }`}
              />
              {!isVideoEnabled && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                  <VideoOff className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-400">Camera Off</p>
                </div>
              )}
              {/* Overlay video label */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
                  You
                </span>
              </div>
            </>
          ) : (
            // Stranger's video as overlay
            <>
              {remoteStream ? (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                  <Users className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-400">Connecting...</p>
                </div>
              )}
              {/* Overlay video label */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
                  Stranger
                </span>
              </div>
            </>
          )}

          {/* Minimize/Maximize button */}
          <button
            onClick={toggleLocalVideoSize}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            {isLocalVideoMinimized ? (
              <Maximize className="w-3 h-3" />
            ) : (
              <Minimize className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute top-20 left-6 right-6 z-30">
            <Card className="p-4 bg-red-900/80 backdrop-blur-sm border-red-700">
              <p className="text-red-300 text-sm">{error}</p>
            </Card>
          </div>
        )}

        {/* Bottom Controls - Shows/hides with controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${
            showControls
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="flex items-center justify-center space-x-6">
              {/* Video Toggle */}
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

              {/* Audio Toggle */}
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

              {/* Skip Button */}
              <button
                onClick={onSkipCall}
                className="p-4 rounded-full bg-gray-600/80 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 hover:bg-gray-500/80"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              {/* End Call Button */}
              <button
                onClick={onEndCall}
                className="p-6 rounded-full bg-red-500 text-white transition-all duration-300 hover:scale-110 hover:bg-red-600 shadow-lg"
              >
                <Phone className="w-7 h-7 rotate-[135deg]" />
              </button>

              <Popover open={showSettings} onOpenChange={setShowSettings}>
                <PopoverTrigger asChild>
                  <button className="p-6 w-20 h-20 rounded-full bg-gray-600/80 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 hover:bg-gray-500/80 flex items-center justify-center">
                    <span className="text-[2rem]">
                      {countries.find((c) => c.code === selectedCountry)
                        ?.flag ?? "🌍"}
                    </span>
                  </button>
                </PopoverTrigger>

                {/* <PopoverContent className="bg-gray-900 border border-gray-700 text-white p-2 w-full max-h-48 overflow-y-auto"> */}
                <PopoverContent
                  side="top"
                  // align="center"
                  className="bg-gray-900 border border-gray-700 text-white p-2 w-full max-h-48 overflow-y-auto"
                >
                  <div className="grid grid-cols-8 gap-2">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country.code);
                          setShowSettings(false); // close popover
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

        {/* Click anywhere to show/hide controls */}
        <div
          className="absolute inset-0 z-10"
          onClick={() => setShowControls(!showControls)}
        />
      </div>
    </div>
  );
};
