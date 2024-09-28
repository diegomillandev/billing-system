"use client";
import { useAppStates } from "@/hooks/useAppStates";
import { Menu } from "lucide-react";
import { DarkModeToggle } from "../DarkToogle";

export function Header() {
  const { toggleSidebar } = useAppStates();
  return (
    <header className="h-20 bg-backgroundBox shadow z-20 px-6">
      <div className="h-full flex items-center justify-between lg:justify-end">
        <button
          className="border border-colorBorder p-2 lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
        <DarkModeToggle />
      </div>
    </header>
  );
}
