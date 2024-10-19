"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Product, ProductSelect, StockForm } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";
import { formatPrice } from "@/utils";

interface ModalAddStockProps {
  handleReload: () => void;
}

export function ModalAddStock(props: ModalAddStockProps) {
  const [quantity, setQuantity] = useState<number | string>(0);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [showProduct, setShowProduct] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // routes and params
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("newStock");

  const initial: StockForm = {
    productId: "",
    quantity: parseInt(quantity as string),
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
    const url = `${pathname}`;
    router.push(url);
    resetSetters();
  };

  const setNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const stateMap: {
      [key: string]: React.Dispatch<React.SetStateAction<string | number>>;
    } = {
      quantity: setQuantity,
    };

    const setter = stateMap[name];

    if (setter) {
      setter(value === "" ? "" : parseInt(value));
    }
  };

  const resetSetters = () => {
    setQuantity(0);
    setProductId("");
    setShowProduct([]);
  };

  const getProduts = async () => {
    try {
      const response = await fetch("/api/products");
      const dataResponse = ProductSelect.safeParse(await response.json());
      if (dataResponse.success) {
        setProducts(dataResponse.data as Product[]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduts();
  }, []);

  useEffect(() => {
    if (productId) {
      const product = products.filter((product) => product._id === productId);
      setShowProduct(product);
    }
  }, [productId]);

  const onSubmit = async (data: StockForm) => {
    setLoading(true);
    const dataStock = {
      ...data,
      quantity: quantity,
    };
    console.log(dataStock);

    try {
      const response: Response = await fetch("/api/stock", {
        method: "POST",
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
    reset();
    resetSetters();
  };

  if (query === "true") {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-400/30 flex items-center justify-center p-4">
        <div className="bg-backgroundBox rounded w-full max-w-[450px] max-h-[90vh] overflow-y-auto p-6 relative">
          <div>
            <button
              className="text-gray-400 absolute top-4 right-4"
              onClick={closeModal}
            >
              <X size={32} />
            </button>
          </div>
          <form
            className="mt-4 lg:mt-8 grid grid-cols-1 lg:gap-5 space-y-2 lg:space-y-0"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <label
                htmlFor="categoryId"
                className={`block ${errors.productId && "text-red-500"}`}
              >
                Product
              </label>
              <select
                id="categoryId"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.productId
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                {...register("productId", { required: true })}
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.code}
                  </option>
                ))}
              </select>
            </div>
            {showProduct &&
              showProduct.map((product) => (
                <div
                  key={product._id}
                  className="border border-colorBorder p-2 flex flex-col gap-y-1"
                >
                  <p className="font-semibold text-sm">
                    Product:{" "}
                    <span className="font-extralight">{product.name}</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Code:{" "}
                    <span className="font-extralight">{product.code}</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Price:{" "}
                    <span className="font-extralight">
                      ${formatPrice(product.price)}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Cost Price:{" "}
                    <span className="font-extralight">
                      ${formatPrice(product.costPrice)}
                    </span>
                  </p>
                </div>
              ))}
            <div className="">
              <label
                htmlFor="soldPrice"
                className={`block ${errors.quantity && "text-red-500"}`}
              >
                Cuantity<span className="text-xs">{` (units)`}</span>
              </label>
              <input
                type="text"
                id="soldPrice"
                className={`mt-1 block w-full rounded-sm border py-2 pr-4 font-light focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light text-right
                      ${
                        errors.quantity
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                placeholder="Enter quantity"
                {...register("quantity", { required: true })}
                value={quantity}
                onChange={(e) => setNumber(e)}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="w-full min-h-10 bg-blue-700 hover:bg-blue-600 text-white rounded-sm py-2 mt-3 flex items-center justify-center gap-x-2"
              >
                {!loading ? (
                  <>
                    <Plus size={20} />
                    <span>Add Stock</span>
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
