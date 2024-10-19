"use client";
import { useSearch } from "@/hooks/useSearch";
import { Order, OrdersSchema } from "@/types";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { EyeIcon, Trash2 } from "lucide-react";
import { ModalAddSales } from "../ModalAddSales";
import Link from "next/link";

export function TableSales() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { search, setSearch, filteredData, setDataProcesing } =
    useSearch<Order>();

  const handleReload = () => {
    setReload(!reload);
  };

  const fetchSales = async () => {
    if (!filteredData.length) setLoading(true);
    try {
      const res = await fetch("/api/sales");
      const data = OrdersSchema.safeParse(await res.json());
      if (data.success) {
        setDataProcesing(data.data);
        console.log(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  function calculateTotal(products: { total: number }[]): number {
    const total = products.reduce((acc, product) => acc + product.total, 0);
    return total;
  }

  useEffect(() => {
    fetchSales();
  }, [reload]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader color="bg-colorText" />
      </div>
    );
  }

  return (
    <>
      <main className="mt-5">
        <div className="relative w-12/12 md:w-2/4 mb-5 flex items-center gap-x-2">
          <input
            type="text"
            placeholder="Search Sales"
            className="w-11/12 p-2 border border-colorBorder bg-backgroundBox rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <Trash2 className="top-3 text-colorText hover:text-red-500" />
            </button>
          )}
        </div>
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center mt-10 ">
            <p className="text-colorText">No sales no found</p>
          </div>
        ) : (
          <div className="relative overflow-x-auto border border-colorBorder">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-colorText bg-headerTable uppercase bg-gray-50 border-b border-colorBorder">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Invoice Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of sale
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((sale) => (
                  <tr
                    className="border-b border-colorBorder bg-backgroundBox hover:bg-hoverRowTalble"
                    key={sale._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-colorText"
                    >
                      <span>#{sale.invoiceNumber}</span>
                    </th>
                    <th scope="row" className="px-6 py-4 gap-x-1 flex">
                      <span>{sale.clientId.name}</span>
                      <span>{sale.clientId.lastname}</span>
                    </th>
                    <td className="px-6 py-4">
                      <span>${calculateTotal(sale.products)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span>{sale.saleDate.split("-").join("/")}</span>
                    </td>
                    <td className="px-6 py-4 flex justify-center">
                      <Link
                        href={`/sales/${sale._id}`}
                        className="font-medium text-colorText hover:text-blue-600 hover:underline cursor-pointer"
                      >
                        <EyeIcon size={24} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <ModalAddSales handleReload={handleReload} />
    </>
  );
}
