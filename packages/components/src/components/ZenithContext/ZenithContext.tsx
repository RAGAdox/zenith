import React, { createContext, useContext } from "react";

const zenithContext = createContext<React.ComponentType | null>(null);

interface ZenithProviderProps {
  children: React.ReactNode;
  linkComponent: React.ComponentType<any>;
}
const ZenithProvider = ({ children, linkComponent }: ZenithProviderProps) => {
  return (
    <zenithContext.Provider value={linkComponent}>
      {children}
    </zenithContext.Provider>
  );
};

export const useZenithContext = () => {
  if (!zenithContext) {
    throw new Error("useZenithContext must be used within a ZenithProvider");
  }
  return useContext(zenithContext);
};

export default ZenithProvider;
export type { ZenithProviderProps };
