import { HeaderPage } from "@/components/Shared/HeaderPage";
import { WrapperCards } from "./components/WrapperCards";
import { Suspense } from "react";
const routes = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
];
export default function CategoriesPage() {
  return (
    <Suspense>
      <HeaderPage
        routes={routes}
        headerTitle="Categories"
        buttonText="Add category"
        query="newCategory=true"
      />
      <WrapperCards />
    </Suspense>
  );
}
