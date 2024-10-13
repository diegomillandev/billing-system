import { HeaderPage } from "@/components/Shared/HeaderPage";
import TableClients from "./components/TableClients/TableClients";

const routes = [
  { name: "Home", href: "/" },
  { name: "Clients", href: "/clients" },
];

export default function ClientsPage() {
  return (
    <>
      <HeaderPage
        routes={routes}
        headerTitle="Clients"
        buttonText="Add client"
        query="newClient=true"
      />
      <TableClients />
    </>
  );
}
