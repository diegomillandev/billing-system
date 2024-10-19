"use client";

import { useDarkMode } from "@/hooks/useDarkmode";
import { IoMoon, IoSunny } from "react-icons/io5";

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className={`h-10 w-10 hover:bg-hoverSwitch rounded flex items-center justify-center text-gray-400`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <IoSunny size={22} /> : <IoMoon size={22} />}
    </button>
  );
};
