import { HeaderPage } from "@/components/Shared/HeaderPage";
import { ModalAddProduct } from "./components/ModalAddProduct";

const routes = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

export default function ProductsPage() {
  return (
    <>
      <HeaderPage
        routes={routes}
        headerTitle="Products"
        showButton={true}
        buttonText="Create Product"
        query="newProduct=true"
      />
      <ModalAddProduct />
    </>
  );
}
