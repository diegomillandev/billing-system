"use client";

import { useEffect, useState } from "react";
import { ModalAddStock } from "../ModalAddStock";
import { Stock, StockSelect } from "@/types";
import { useSearch } from "@/hooks/useSearch";
import { Loader } from "@/components/Loader";
import { formatPrice } from "@/utils";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ModalEditStock } from "../ModalEditStock";

export function TableStock() {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [editStock, setEditStock] = useState<Stock>();
  const pathname = usePathname();
  const router = useRouter();
  const { search, setSearch, setDataProcesing, filteredData } =
    useSearch<Stock>();

  const handleReload = () => {
    setReload(!reload);
  };

  const handleEdit = (stock: Stock) => {
    const newUrl = `${pathname}?editStock=${stock._id}`;
    router.push(newUrl);
    handleEditStock(stock);
  };

  const handleEditStock = (stock: Stock) => {
    setEditStock(stock);
  };

  const handleReset = () => {
    setEditStock(undefined);
  };

  const fetchStock = async () => {
    if (!filteredData.length) setLoading(true);
    try {
      const response = await fetch("/api/stock");
      const data = StockSelect.safeParse(await response.json());
      if (data.success) {
        setDataProcesing(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
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
            placeholder="Search Product"
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
            <p className="text-colorText">No Stock Found</p>
          </div>
        ) : (
          <div className="relative overflow-x-auto border border-colorBorder">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-colorText bg-headerTable uppercase bg-gray-50 border-b border-colorBorder">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Sold
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((stock) => (
                  <tr
                    className="border-b border-colorBorder bg-backgroundBox"
                    key={stock._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-colorText flex flex-col"
                    >
                      <span>
                        {typeof stock.productId !== "string"
                          ? stock.productId?.name
                          : ""}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        code:{" "}
                        {typeof stock.productId !== "string"
                          ? stock.productId?.code
                          : ""}
                      </span>
                    </th>
                    <td className="px-6 py-4">
                      $
                      {typeof stock.productId !== "string"
                        ? formatPrice(stock.productId?.price)
                        : ""}
                    </td>
                    <td className="px-6 py-4 text-center">{stock.quantity}</td>
                    <td className="px-6 py-4 text-center">{stock.sold}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(stock)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <ModalAddStock handleReload={handleReload} />
      {editStock && (
        <ModalEditStock
          handleReload={handleReload}
          editStock={editStock}
          handleReset={handleReset}
        />
      )}
    </>
  );
}
