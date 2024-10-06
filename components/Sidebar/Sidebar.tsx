"use client";
import { dataSiderbarRoutes } from "@/data";
import { usePathname } from "next/navigation";
import { NavItem } from "../NavItem";
import { useAppStates } from "@/hooks/useAppStates";
import { MoveLeft } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpenSidebar, toggleSidebar } = useAppStates();
  const active = (href: string): boolean => pathname === href;

  return (
    <aside
      className={`w-72 bg-backgroudSidebar fixed h-full left-0 top-0 -translate-x-full transition-transform duration-300 ease-in-out z-30 sidebarClose
      ${isOpenSidebar ? "translate-x-0" : "lg:translate-x-0"}
        `}
    >
      <div className="px-6 mt-10">
        <div className="flex justify-end mb-4 absolute right-3 top-5 lg:hidden">
          <button className="p-1" onClick={toggleSidebar}>
            <MoveLeft className="text-slate-400 " size={30} />
          </button>
        </div>
        <h2 className="px-3 mb-3 text-slate-400">MENU</h2>
        <nav className="space-y-2">
          {dataSiderbarRoutes.map((route, index) => (
            <NavItem key={index} {...route} active={active(route.href)} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
