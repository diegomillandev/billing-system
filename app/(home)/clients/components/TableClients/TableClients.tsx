"use client";
import { useSearch } from "@/hooks/useSearch";
import { ModalAddClient } from "../ModalAddClient";
import { Client, ClientFetch } from "@/types";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { Trash2 } from "lucide-react";
import { ModalEditClient } from "../ModalEditClient";
import { usePathname, useRouter } from "next/navigation";

export default function TableClients() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const { search, setSearch, filteredData, setDataProcesing } =
    useSearch<Client>();

  const patname = usePathname();
  const router = useRouter();

  const handleReload = () => {
    setReload(!reload);
  };

  const handleEdit = (client: Client) => {
    const newRoute = `${patname}?editClient=${client._id}`;
    router.push(newRoute);
    setEditClient(client);
  };

  const handleResetEdit = () => {
    setEditClient(null);
  };

  const fetchClients = async () => {
    if (!filteredData.length) setLoading(true);
    try {
      const res = await fetch("/api/clients");
      const data = ClientFetch.safeParse(await res.json());
      if (data.success) {
        setDataProcesing(data.data as Client[]);
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
            placeholder="Search Clients"
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
                    className="border-b border-colorBorder bg-backgroundBox hover:bg-hoverRowTalble"
                    key={client._id}
                  >
                    <td
                      scope="row"
                      className={`px-6 py-4 font-medium text-colorText 
                      ${client.email && "flex flex-col"}
                        `}
                    >
                      <span className="">
                        {client.name} {client.lastname}
                      </span>
                      {client.email && (
                        <span className="text-sm text-gray-500 font-medium">
                          {client.email}
                        </span>
                      )}
                    </td>
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
                      <div
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleEdit(client)}
                      >
                        Edit
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <ModalAddClient handleReload={handleReload} />
      {editClient && (
        <ModalEditClient
          handleReload={handleReload}
          editClient={editClient}
          handleResetEdit={handleResetEdit}
        />
      )}
    </>
  );
}
