"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Video, Users } from "lucide-react";
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
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden flex items-center justify-center p-4">
    {/* Decorative blurred blobs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-700/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-spin-slow"></div>

    <div className="text-center relative z-10 -translate-y-32">
      {/* Logo / Hero */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-pulse shadow-[0_0_25px_rgba(147,51,234,0.6)]">
          <Video className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          Connect with Strangers
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Start anonymous conversations with people from around the world.{" "}
          <br />
          No registration, just click and chat.
        </p>
      </div>

      {/* Main Card */}
      <Card className="p-8 mb-6 bg-gray-800/40 backdrop-blur-md border border-transparent bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl shadow-lg shadow-purple-900/40">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-blue-400 mr-3" />
          <span className="text-white font-medium">Ready to connect</span>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Choose your country and start a random video chat
        </p>

        {/* Country Selector */}
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full mb-4 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500">
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

        {/* CTA Button */}
        <Button
          onClick={onStartCall}
          className="w-full h-14 text-lg font-semibold 
          bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 
          bg-[length:200%_200%] animate-gradient 
          hover:scale-105 transition-transform 
          rounded-xl shadow-md shadow-purple-800/40"
          size="lg"
        >
          <Video className="w-6 h-6 mr-3" />
          Start Chatting
        </Button>
      </Card>

      {/* Footer Note */}
      <p className="text-xs text-gray-500">
        By using ChatSpark, you agree to be respectful and follow community
        guidelines
      </p>
    </div>
  </div>
);
