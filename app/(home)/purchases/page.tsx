import { HeaderPage } from "@/components/Shared/HeaderPage";

const routes = [
  { name: "Home", href: "/" },
  { name: "Purchases", href: "/purchases" },
];

export default function PurchasesPage() {
  return (
    <>
      <HeaderPage
        routes={routes}
        headerTitle="Purchases"
        buttonText="Add purchase"
      />
    </>
  );
}
