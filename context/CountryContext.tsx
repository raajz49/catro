// context/CountryContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type CountryContextType = {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCountry, setSelectedCountry] = useState("global");

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within CountryProvider");
  }
  return context;
};
