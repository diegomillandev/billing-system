"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ClientForm } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";
import { Client } from "@/types";

interface ModalCLientProps {
  handleReload: () => void;
  editClient: Client;
  handleResetEdit: () => void;
}

export function ModalEditClient({
  handleReload,
  editClient,
  handleResetEdit,
}: ModalCLientProps) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("editClient");

  const initial: ClientForm = {
    name: editClient.name || "",
    lastname: editClient.lastname || "",
    email: editClient.email || "",
    phone: editClient.phone || "",
    dni: editClient.dni || "",
    address: editClient.address || "",
    city: editClient.city || "",
    state: editClient.state || "",
    observations: editClient.observations || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initial });

  const closeModal = () => {
    handleReload();
    handleResetEdit();
    reset();
    const url = `${pathname}`;
    router.push(url);
  };

  const onSubmit = async (data: ClientForm) => {
    setLoading(true);
    try {
      const response: Response = await fetch(`/api/clients/${query}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { message } = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success(message);
        closeModal();
        reset();
        const url = `${pathname}`;
        router.push(url);
      } else {
        setLoading(false);
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (query) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-400/30 flex items-center justify-center p-4">
        <div className="bg-backgroundBox rounded w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-6 relative">
          <div>
            <button
              className="text-gray-400 absolute top-4 right-4"
              onClick={closeModal}
            >
              <X size={32} />
            </button>
          </div>
          <form
            className="mt-4 lg:mt-8 grid lg:grid-cols-2 lg:gap-5 space-y-2 lg:space-y-0"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <label
                htmlFor="name"
                className={`block ${errors.name && "text-red-500"}`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.name
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="">
              <label
                htmlFor="lastname"
                className={`block ${errors.lastname && "text-red-500"}`}
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.lastname
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client lastname"
                {...register("lastname")}
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className={`block ${errors.email && "text-red-500"}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client email"
                {...register("email")}
              />
            </div>
            <div className="">
              <label
                htmlFor="phone"
                className={`block ${errors.phone && "text-red-500"}`}
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.phone
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client phone"
                {...register("phone", { required: true })}
              />
            </div>
            <div className="">
              <label
                htmlFor="dni"
                className={`block ${errors.dni && "text-red-500"}`}
              >
                DNI
              </label>
              <input
                type="text"
                id="dni"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.dni
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client DNI"
                {...register("dni")}
              />
            </div>
            <div className="">
              <label
                htmlFor="address"
                className={`block ${errors.address && "text-red-500"}`}
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.address
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client address"
                {...register("address")}
              />
            </div>
            <div className="">
              <label
                htmlFor="state"
                className={`block ${errors.state && "text-red-500"}`}
              >
                State
              </label>
              <input
                type="text"
                id="state"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.state
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client state"
                {...register("state", { required: true })}
              />
            </div>
            <div className="">
              <label
                htmlFor="city"
                className={`block ${errors.city && "text-red-500"}`}
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light
                      ${
                        errors.city
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client city"
                {...register("city", { required: true })}
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="observations"
                className={`block ${errors.observations && "text-red-500"}`}
              >
                Observations
              </label>
              <textarea
                id="observations"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light resize-none
                      ${
                        errors.observations
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client observations"
                {...register("observations")}
              />
            </div>
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full min-h-10 bg-blue-700 hover:bg-blue-600 text-white rounded-sm py-2 mt-3 flex items-center justify-center gap-x-2"
              >
                {!loading ? (
                  <>
                    <Plus size={20} />
                    <span>Edit client</span>
                  </>
                ) : (
                  <Loader />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
