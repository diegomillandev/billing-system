"use client";
import { dataSiderbarRoutes } from "@/data";
import { NavItem } from "../NavItem";
import { useAppStates } from "@/hooks/useAppStates";
import { MoveLeft } from "lucide-react";
import { Logo } from "../Shared/Logo";
import { useEffect } from "react";

export function Sidebar() {
  const { isOpenSidebar, toggleSidebar } = useAppStates();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        toggleSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleSidebar]);

  return (
    <aside
      className={`w-72 bg-backgroudSidebar fixed h-full left-0 top-0 -translate-x-full transition-transform duration-300 ease-in-out z-30 sidebarClose overflow-scroll
      ${
        isOpenSidebar
          ? "translate-x-0 border-r border-colorBorder"
          : "lg:translate-x-0"
      }
    `}
    >
      <div className="px-6 mt-10 lg:mt-4">
        <Logo />
        <div className="flex justify-end mb-4 absolute right-3 top-2 lg:hidden">
          <button className="p-1" onClick={toggleSidebar}>
            <MoveLeft className="text-slate-400 " size={30} />
          </button>
        </div>
        <h2 className="px-3 mb-3 text-slate-500">MENU</h2>
        <nav className="space-y-2">
          {dataSiderbarRoutes.map((route, index) => (
            <NavItem
              key={index}
              {...route}
              toggleSidebar={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
