"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { countries } from "@/types/globalTypes";
import { useCountry } from "@/context/CountryContext";

export default function Navbar() {
  const [showSettings, setShowSettings] = useState(false);
  const { selectedCountry, setSelectedCountry } = useCountry();
  const [videoQuality, setVideoQuality] = useState("auto");
  const [isVideoEnabled] = useState(true);
  const [isAudioEnabled] = useState(true);

  return (
    <nav className="relative w-full flex items-center justify-between px-6 py-4 bg-black border-b border-white/10 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">ChatSpark</div>

      {/* Settings Button */}
      <Button
        variant="default"
        size="sm"
        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </Button>

      {/* Settings Dialog */}
      {showSettings && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowSettings(false)} // click outside closes
        >
          <div
            className="absolute top-16 right-4 w-80"
            onClick={(e) => e.stopPropagation()} // prevent bubbling
          >
            <Card className="p-4 bg-black/80 backdrop-blur-sm border-white/20 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Call Settings</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Country Selector */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country/Region
                  </label>
                  <Select
                    value={selectedCountry}
                    onValueChange={(val) => {
                      setSelectedCountry(val);
                      setShowSettings(false); // close after select
                    }}
                  >
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {countries.map((c) => (
                        <SelectItem
                          key={c.code}
                          value={c.code}
                          className="text-white hover:bg-gray-700"
                        >
                          {c.flag} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Video Quality */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Video Quality
                  </label>
                  <Select
                    value={videoQuality}
                    onValueChange={(val) => {
                      setVideoQuality(val);
                      setShowSettings(false); // close after select
                    }}
                  >
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem
                        value="auto"
                        className="text-white hover:bg-gray-700"
                      >
                        Auto
                      </SelectItem>
                      <SelectItem
                        value="hd"
                        className="text-white hover:bg-gray-700"
                      >
                        HD (720p)
                      </SelectItem>
                      <SelectItem
                        value="sd"
                        className="text-white hover:bg-gray-700"
                      >
                        SD (480p)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Connection Info */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span>Connection:</span>
                    <span className="text-green-400">Excellent</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Video:</span>
                    <span>{isVideoEnabled ? "On" : "Off"}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Audio:</span>
                    <span>{isAudioEnabled ? "On" : "Off"}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </nav>
  );
}
