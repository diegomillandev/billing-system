"use client";
import { useSearch } from "@/hooks/useSearch";
import { ModalAddClient } from "../ModalAddClient";
import { Client, ClientFetch } from "@/types";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { Trash2 } from "lucide-react";

export default function TableClients() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { search, setSearch, filteredData, setDataProcesing } =
    useSearch<Client>();

  const handleReload = () => {
    setReload(!reload);
  };

  const fetchClients = async () => {
    if (!filteredData.length) setLoading(true);
    try {
      const res = await fetch("/api/clients");
      const data = ClientFetch.safeParse(await res.json());
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
    fetchClients();
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
            <p className="text-colorText">No Clients found</p>
          </div>
        ) : (
          <div className="relative overflow-x-auto border border-colorBorder">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-colorText bg-headerTable uppercase bg-gray-50 border-b border-colorBorder">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Buys
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((client) => (
                  <tr
                    className="border-b border-colorBorder bg-backgroundBox"
                    key={client._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-colorText flex flex-col"
                    >
                      <span>
                        {client.name} {client.lastname}
                      </span>
                      {client.email && (
                        <span className="text-sm text-gray-500 font-medium">
                          {client.email}
                        </span>
                      )}
                    </th>
                    <td className="px-6 py-4">{client.phone}</td>
                    <td className="px-6 py-4">{client.buys}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-colorText flex flex-col"
                    >
                      <span>{client.city}</span>
                      <span className="text-sm text-gray-500 font-medium">
                        {client.state}
                      </span>
                    </th>
                    <td className="px-6 py-4 ">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {}}
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
      <ModalAddClient handleReload={handleReload} />
    </>
  );
}
