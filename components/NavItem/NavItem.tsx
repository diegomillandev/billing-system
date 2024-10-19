import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  toggleSidebar?: () => void;
}

export function NavItem({
  href,
  icon: Icon,
  title,
  toggleSidebar,
}: NavItemProps) {
  const pathname = usePathname();
  const active = (href: string): boolean => pathname === href;

  return (
    <Link
      href={href}
      className={`block text-colorText py-3 px-3 hover:bg-slate-500 hover:bg-opacity-20 rounded transition-colors duration-200 ${
        active(href) ? "bg-slate-500 bg-opacity-20" : ""
      }`}
      onClick={toggleSidebar}
    >
      <span className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-iconSidebar" />
        <span className="text-textSidebar">{title}</span>
      </span>
    </Link>
  );
}
