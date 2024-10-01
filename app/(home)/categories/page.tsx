import { HeaderPage } from "@/components/Shared/HeaderPage";
import { WrapperCards } from "./components/WrapperCards";
const routes = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
];
export default function CategoriesPage() {
  return (
    <>
      <HeaderPage
        routes={routes}
        headerTitle="Categories"
        buttonText="Add category"
        query="newCategory=true"
      />
      <WrapperCards />
    </>
  );
}
