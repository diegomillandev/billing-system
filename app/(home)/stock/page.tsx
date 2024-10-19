import { HeaderPage } from "@/components/Shared/HeaderPage";
import { TableStock } from "./components/TableStock";
import { Suspense } from "react";

const routes = [
  { name: "Home", href: "/" },
  { name: "Stock", href: "/stock" },
];

export default function StockPage() {
  return (
    <Suspense>
      <HeaderPage
        routes={routes}
        headerTitle="Stock"
        buttonText="Add stock"
        query="newStock=true"
      />
      <TableStock />
    </Suspense>
  );
}
