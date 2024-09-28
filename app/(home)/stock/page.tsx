import { HeaderPage } from "@/components/Shared/HeaderPage";

const routes = [
  { name: "Home", href: "/" },
  { name: "Stock", href: "/stock" },
];

export default function StockPage() {
  return (
    <>
      <HeaderPage routes={routes} headerTitle="Stock" buttonText="Add stock" />
    </>
  );
}
