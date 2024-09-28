"use client";

import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkmode";

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className={`p-2 border border-colorBorder`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <Sun strokeWidth={1.25} size={26} />
      ) : (
        <Moon strokeWidth={1.25} size={26} />
      )}
    </button>
  );
};
