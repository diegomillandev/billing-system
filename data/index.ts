import {
  Barcode,
  LayoutDashboard,
  Receipt,
  Sheet,
  ShoppingCart,
  Tag,
  UsersRound,
} from "lucide-react";

export const dataSiderbarRoutes = [
  {
    href: "/",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/stock",
    title: "Stock",
    icon: Sheet,
  },
  {
    href: "/products",
    title: "Products",
    icon: Barcode,
  },
  {
    href: "/categories",
    title: "Categories",
    icon: Tag,
  },
  {
    href: "/clients",
    title: "Clients",
    icon: UsersRound,
  },
  {
    href: "/sales",
    title: "Sales",
    icon: ShoppingCart,
  },
  {
    href: "/purchases",
    title: "Purchases",
    icon: Receipt,
  },
];
