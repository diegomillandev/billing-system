import { HeaderPage } from "@/components/Shared/HeaderPage";
import { WrapperProducts } from "./components/WrapperProducts";
import { Suspense } from "react";

const routes = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

export default function ProductsPage() {
  return (
    <Suspense>
      <HeaderPage
        routes={routes}
        headerTitle="Products"
        showButton={true}
        buttonText="Create Product"
        query="newProduct=true"
      />
      <WrapperProducts />
    </Suspense>
  );
}
