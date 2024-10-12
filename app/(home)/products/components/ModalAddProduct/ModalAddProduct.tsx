"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Category, CategorySelect, ProductForm } from "@/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";

type StateMapType = {
  [key: string]: Dispatch<SetStateAction<number>>;
};

interface ModalAddProductProps {
  handleReload: () => void;
}

export function ModalAddProduct(props: ModalAddProductProps) {
  const [price, setPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("newProduct");

  const initial: ProductForm = {
    code: "",
    name: "",
    price: price,
    costPrice: costPrice,
    categoryId: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initial });

  const closeModal = () => {
    props.handleReload();
    reset();
    const url = `${pathname}`;
    router.push(url);
  };

  const setNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const stateMap: StateMapType = {
      price: setPrice,
      costPrice: setCostPrice,
    };

    const setter = stateMap[name];

    if (setter) {
      setter(value === "" ? 0 : parseInt(value));
    }
  };

  const resetSetters = () => {
    setPrice(0);
    setCostPrice(0);
  };

  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const dataResponse = CategorySelect.safeParse(await response.json());
      if (dataResponse.success) {
        setCategories(dataResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async (data: ProductForm) => {
    setLoading(true);
    const dataProduct = {
      ...data,
      price: price,
      costPrice: costPrice,
    };

    try {
      const response: Response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataProduct),
      });
      const { message } = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success(message);
        reset();
        closeModal();
        const url = `${pathname}`;
        router.push(url);
      } else {
        setLoading(false);
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
    reset();
    resetSetters();
  };

  if (query === "true") {
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
                htmlFor="code"
                className={`block ${errors.code && "text-red-500"}`}
              >
                Code
              </label>
              <input
                type="text"
                id="code"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.code
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter code product"
                {...register("code", { required: true })}
              />
            </div>
            <div className="">
              <label
                htmlFor="name"
                className={`block ${errors.name && "text-red-500"}`}
              >
                Name Product
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
                placeholder="Enter client address"
                {...register("name", { required: true })}
              />
            </div>
            <div className="">
              <label
                htmlFor="price"
                className={`block ${errors.price && "text-red-500"}`}
              >
                Price <span className="text-xs">{`($)`}</span>
              </label>
              <input
                type="text"
                id="price"
                className={`mt-1 block w-full rounded-sm border py-2 pr-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light text-right
                      ${
                        errors.price
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client email"
                {...register("price", { required: true })}
                value={price}
                onChange={(e) => setNumber(e)}
              />
            </div>
            <div className="">
              <label
                htmlFor="costPrice"
                className={`block ${errors.costPrice && "text-red-500"}`}
              >
                Cost Price <span className="text-xs">{`($)`}</span>
              </label>
              <input
                type="text"
                id="costPrice"
                className={`mt-1 block w-full rounded-sm border py-2 pr-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light text-right
                      ${
                        errors.costPrice
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter client phone"
                {...register("costPrice", { required: true })}
                value={costPrice}
                onChange={(e) => setNumber(e)}
              />
            </div>
            <div className="">
              <label
                htmlFor="categoryId"
                className={`block ${errors.categoryId && "text-red-500"}`}
              >
                Category
              </label>
              <select
                id="categoryId"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.categoryId
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                {...register("categoryId", { required: true })}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="description"
                className={`block ${errors.description && "text-red-500"}`}
              >
                Observations
              </label>
              <textarea
                id="description"
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
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full min-h-10 bg-blue-700 hover:bg-blue-600 text-white rounded-sm py-2 mt-3 flex items-center justify-center gap-x-2"
              >
                {!loading ? (
                  <>
                    <Plus size={20} />
                    <span>Add Product</span>
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
