"use client";
import { useAppStates } from "@/hooks/useAppStates";
import { HiMenuAlt1 } from "react-icons/hi";

export function ButtonMenu() {
  const { toggleSidebar } = useAppStates();
  return (
    <button
      className="lg:hidden h-10 w-10 hover:bg-hoverSwitch rounded flex items-center justify-center text-gray-400"
      onClick={toggleSidebar}
    >
      <HiMenuAlt1 size={30} />
    </button>
  );
}
