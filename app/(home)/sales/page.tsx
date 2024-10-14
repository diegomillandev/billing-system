import { HeaderPage } from "@/components/Shared/HeaderPage";
import { ModalAddSales } from "./components/ModalAddSales";

const routes = [
  { name: "Home", href: "/" },
  { name: "Sales", href: "/sales" },
];

export default function SalesPage() {
  return (
    <>
      <HeaderPage
        routes={routes}
        headerTitle="Sales"
        buttonText="Add sale"
        query="newAddSales=true"
      />
      <ModalAddSales />
    </>
  );
}
