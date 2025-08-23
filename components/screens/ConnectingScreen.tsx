import { countries } from "@/types/globalTypes";
import { Video } from "lucide-react";
import React from "react";

interface ConnectingScreenProps {
  selectedCountry: string;
}

export const ConnectingScreen: React.FC<ConnectingScreenProps> = ({
  selectedCountry,
}) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6 animate-pulse">
        <Video className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-white">Connecting...</h2>
      <p className="text-gray-400 mb-6">
        Finding someone to chat with in{" "}
        {countries.find((c) => c.code === selectedCountry)?.flag}{" "}
        {countries.find((c) => c.code === selectedCountry)?.name}
      </p>
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
);
