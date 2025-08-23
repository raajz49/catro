"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { countries } from "@/types/globalTypes";
interface HomeScreenProps {
  onStartCall: () => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartCall,
  selectedCountry,
  setSelectedCountry,
}) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-pulse">
          <Video className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          ChatSpark
        </h1>
        <p className="text-gray-400 text-lg">
          Connect with strangers around the world through video chat
        </p>
      </div>

      <Card className="p-8 mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-blue-400 mr-3" />
          <span className="text-white font-medium">Ready to connect</span>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Choose your country and start a random video chat
        </p>

        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full mb-4 bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {countries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="text-white hover:bg-gray-700"
              >
                {country.flag} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={onStartCall}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
          size="lg"
        >
          <Video className="w-6 h-6 mr-3" />
          Start Video Call
        </Button>
      </Card>

      <p className="text-xs text-gray-500">
        By using ChatSpark, you agree to be respectful and follow community
        guidelines
      </p>
    </div>
  </div>
);
