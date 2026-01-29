"use client";

import * as React from "react";

interface SnowContextType {
  isSnowing: boolean;
  setIsSnowing: (value: boolean) => void;
  toggleSnow: () => void;
}

const SnowContext = React.createContext<SnowContextType | undefined>(undefined);

export function SnowProvider({ children }: { children: React.ReactNode }) {
  const [isSnowing, setIsSnowing] = React.useState(false);

  const toggleSnow = React.useCallback(() => {
    setIsSnowing((prev) => !prev);
  }, []);

  return (
    <SnowContext.Provider value={{ isSnowing, setIsSnowing, toggleSnow }}>
      {children}
    </SnowContext.Provider>
  );
}

export function useSnow() {
  const context = React.useContext(SnowContext);
  if (context === undefined) {
    throw new Error("useSnow must be used within a SnowProvider");
  }
  return context;
}
