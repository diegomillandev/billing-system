import { HeaderPage } from "@/components/Shared/HeaderPage";
import { TableStock } from "./components/TableStock";

const routes = [
  { name: "Home", href: "/" },
  { name: "Stock", href: "/stock" },
];

export default function StockPage() {
  return (
    <>
      <HeaderPage
        routes={routes}
        headerTitle="Stock"
        buttonText="Add stock"
        query="newStock=true"
      />
      <TableStock />
    </>
  );
}
