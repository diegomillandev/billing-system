"use client";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface routes {
  name: string;
  href: string;
}

interface Props {
  routes: routes[];
  headerTitle: string;
  showButton?: boolean;
  buttonText?: string;
  query?: string;
}

export function HeaderPage({
  routes,
  headerTitle,
  showButton = true,
  buttonText,
  query,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleAddClient = () => {
    if (query === undefined) return;
    const newUrl = `${pathname}?${query}`;
    router.push(newUrl);
  };

  return (
    <header className="flex flex-col space-y-3">
      <div className="flex items-center">
        {routes.map((route, index) => (
          <div key={route.href} className="flex items-center text-sm">
            <Link href={route.href}>
              <span
                className={index === routes.length - 1 ? "text-slate-400" : ""}
              >
                {route.name}
              </span>
            </Link>
            {index < routes.length - 1 && (
              <ChevronRight size={20} className="text-gray-500 mx-1" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium">{headerTitle}</h1>

        <button
          className={`${
            showButton ? "block" : "hidden"
          } bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded flex items-center gap-x-2`}
          onClick={handleAddClient}
        >
          <Plus size={24} />
          <span className="hidden md:block">{buttonText}</span>
        </button>
      </div>
    </header>
  );
}
