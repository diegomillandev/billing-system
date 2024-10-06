"use client";

import { useEffect, useState } from "react";
import { CardProduct } from "../CardProduct";
import { Product, ProductSelect } from "@/types";
import { Loader } from "@/components/Loader";
import { useSearch } from "@/hooks/useSearch";
import { Trash2 } from "lucide-react";

export function WrapperProducts() {
  const { search, setSearch, setDataProcesing, filteredData } =
    useSearch<Product>();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    if (!filteredData.length) setLoading(true);
    try {
      const response = await fetch("/api/products");
      const data = ProductSelect.safeParse(await response.json());
      if (data.success) {
        setDataProcesing(data.data as Product[]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
      <main className="mt-10">
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
            <p className="text-colorText">No Products Found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredData.map((product) => (
                <CardProduct key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
