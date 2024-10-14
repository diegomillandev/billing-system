"use client";
import { Loader } from "@/components/Loader";
import { HeaderPage } from "@/components/Shared/HeaderPage";
import { Order, OrderSchema } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Invoice } from "./components/Invoice";

const routes = [
  { name: "Home", href: "/" },
  { name: "Sales", href: "/sales" },
  { name: "View Sale", href: "" },
];
export default function ViewSalePage() {
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState<Order>();
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const fetchSale = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/sales/${id}`);
      const data = OrderSchema.safeParse(await response.json());
      if (data.success) {
        setSale(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSale();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader color="bg-colorText" />
      </div>
    );
  }
  return (
    <>
      <HeaderPage routes={routes} headerTitle="View Sale" showButton={false} />
      {sale ? <Invoice order={sale} /> : <div>Not found</div>}
    </>
  );
}
