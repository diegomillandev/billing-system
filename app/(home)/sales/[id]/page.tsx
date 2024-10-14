import { HeaderPage } from "@/components/Shared/HeaderPage";

const routes = [
  { name: "Home", href: "/" },
  { name: "Sales", href: "/sales" },
  { name: "View Sale", href: "" },
];
export default function ViewSalePage() {
  return (
    <>
      <HeaderPage routes={routes} headerTitle="View Sale" showButton={false} />
    </>
  );
}
