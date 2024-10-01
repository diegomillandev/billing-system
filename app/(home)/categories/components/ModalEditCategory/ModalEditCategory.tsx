"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";
import { Category, CategoryForm } from "@/types";

interface Props {
  handleReload: () => void;
  categoryEdit: Category;
  clearCategoryEdit: () => void;
}

export function ModalEditCategory(props: Props) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const querySearch = searchParams.get("editCategory");

  const initial: CategoryForm = {
    name: props.categoryEdit.name || "",
    description: props.categoryEdit.description || "",
    active: props.categoryEdit.active || "active",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initial });

  const closeModal = () => {
    reset();
    props.handleReload();
    props.clearCategoryEdit();
    const url = `${pathname}`;
    router.push(url);
  };
  const onSubmit = async (data: CategoryForm) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${querySearch}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const { message } = await response.json();
      if (response.ok) {
        toast.success(message);
        reset();
        setLoading(false);
        closeModal();
        const url = `${pathname}`;
        router.push(url);
      } else {
        setLoading(false);
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (querySearch !== null) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-400/30 flex items-center justify-center p-4">
        <div className="bg-backgroundBox rounded w-full max-w-[550px] max-h-[90vh] overflow-y-auto p-6 relative">
          <div>
            <button
              className="text-gray-400 absolute top-4 right-4"
              onClick={closeModal}
            >
              <X size={32} />
            </button>
          </div>
          <form
            className="mt-4 grid space-y-6 "
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-2">
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
            <div className="col-span-2">
              <label
                htmlFor="name"
                className={`block ${errors.active && "text-red-500"}`}
              >
                Active
              </label>
              <select
                id="name"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.active
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                {...register("active", { required: true })}
                defaultValue={initial.active}
              >
                <option value="active">Active</option>
                <option value="desactive">Desactive</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="observations"
                className={`block ${errors.description && "text-red-500"}`}
              >
                Description
              </label>
              <textarea
                id="observations"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light resize-none
                      ${
                        errors.description
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client observations"
                {...register("description")}
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full min-h-10 bg-blue-700 hover:bg-blue-600 text-white rounded-sm py-2 mt-3 flex items-center justify-center gap-x-2"
              >
                {!loading ? (
                  <>
                    <Plus size={20} />
                    <span>Edit Category</span>
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
