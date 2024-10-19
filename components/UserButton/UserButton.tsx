"use client";

import { User } from "@/types";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

interface UserProps {
  user: User;
}
export function UserButton({ user }: UserProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = () => {
    signOut();
    handleShowMenu();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="h-10 w-10 hover:bg-hoverSwitch rounded flex items-center justify-center text-gray-400 group"
        onClick={handleShowMenu}
      >
        <FaUser />
      </button>
      {showMenu && (
        <div className="bg-backgroundBox border border-colorBorder absolute right-0 mt-1 top-full min-w-48">
          <div className="flex flex-col items-start px-3 py-2">
            <div className="text-sm font-normal capitalize">
              {user.name} {user.lastname}
            </div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
          <hr className="h-px border border-colorBorder" />
          <button
            className="w-full px-3 py-2 hover:bg-hoverSwitch text-left"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
