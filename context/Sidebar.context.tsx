"use client";
import { createContext, useState, ReactNode } from "react";

interface AppContextType {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType>(null!);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);

  return (
    <AppContext.Provider value={{ isOpenSidebar, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};
