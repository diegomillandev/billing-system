"use client";

import { Loader } from "@/components/Loader";
import {
  Client,
  ClientFetch,
  Product,
  ProductSaleForm,
  ProductSelect,
} from "@/types";
import { formatPrice } from "@/utils";
import { Plus, Trash2, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModalAddSalesProps {
  handleReload: () => void;
}

export function ModalAddSales({ handleReload }: ModalAddSalesProps) {
  const [loading, setLoading] = useState(false);
  const [saleDate, setSaleDate] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(0);

  const [clientId, setClientId] = useState("");
  const [showClient, setShowClient] = useState<Client[]>();

  const [productId, setProductId] = useState("");
  const [showProductSale, setShowProductSale] = useState<ProductSaleForm[]>();

  const pathname = usePathname();
  const router = useRouter();
  const searhcParams = useSearchParams();
  const query = searhcParams.get("newAddSales");

  const closeModal = () => {
    handleReload();
    clearsStates();
    const url = `${pathname}`;
    router.push(url);
    setProductId("");
    setQuantity(0);
    setShowProductSale(undefined);
  };

  const addProductList = () => {
    if (quantity) {
      const product = products.filter((product) => product._id === productId);
      if (product.length === 0) return;

      const productSaleExits = showProductSale?.find(
        (productSale) => productSale.productId._id === productId
      );

      if (productSaleExits) {
        const productSale = showProductSale?.map((productSale) => {
          if (productSale.productId._id === productId) {
            productSale.quantity =
              Number(productSale.quantity) + Number(quantity);
            productSale.total = productSale.quantity * product[0].price;
          }
          return productSale;
        });
        setShowProductSale(productSale);
      } else {
        const productSale: ProductSaleForm = {
          productId: product[0],
          quantity: quantity,
          total: product[0].price * quantity,
        };
        setShowProductSale(
          showProductSale ? [...showProductSale, productSale] : [productSale]
        );
      }

      setProductId("");
      setQuantity(0);
    }
  };

  const deleteProductList = (productId: string) => {
    if (!showProductSale) return;
    const productSale = showProductSale.filter(
      (productSale) => productSale.productId._id !== productId
    );
    setShowProductSale(productSale);
  };

  const clearsStates = () => {
    setShowClient([]);
    setClientId("");
    reset();
  };

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = ClientFetch.safeParse(await res.json());
      if (data.success) {
        setClients(data.data as Client[]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = ProductSelect.safeParse(await response.json());
      if (data.success) {
        setProducts(data.data as Product[]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    if (!showProductSale?.length) {
      toast.error("You must add at least one product to the sale");
      return;
    }

    setLoading(true);
    const receipt = {
      clientId: clientId,
      products: showProductSale?.map((productSale) => ({
        productId: productSale.productId._id,
        quantity: productSale.quantity,
        total: productSale.total,
      })),
      saleDate: saleDate,
    };
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receipt),
      });

      const data = await res.json();
      if (data.message && res.ok) {
        toast.success(data.message);
        setLoading(false);
        closeModal();
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const totalSale = showProductSale?.reduce(
    (acc, productSale) => acc + productSale.total,
    0
  );

  useEffect(() => {
    if (clientId) {
      const client = clients.filter((client) => client._id === clientId);
      setShowClient(client);
    }
  }, [clientId]);

  if (query === "true") {
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
          <h1 className="text-3xl">Register sales</h1>
          <form
            className="mt-4 grid grid-cols-1 space-y-3"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-xl -mb-2">Client</h2>
            <div className="mb-3">
              <select
                id="clientId"
                className={`mt-1 block w-full rounded-sm border py-2 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.clientId
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                {...register("clientId", { required: true })}
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name} {client.lastname}
                  </option>
                ))}
              </select>
            </div>
            {showClient &&
              showClient.map((client) => (
                <div
                  className="border border-colorBorder p-2 flex flex-col gap-y-1"
                  key={client._id}
                >
                  <p className="text-sm flex gap-x-1">
                    <span className="font-semibold text-sm">Name:</span>
                    <span className="font-extralight">
                      {client.name} {client.lastname}
                    </span>
                  </p>
                  <p className="text-sm flex gap-x-1">
                    <span className="font-semibold text-sm">Phone:</span>
                    <span className="font-extralight">{client.phone}</span>
                  </p>
                  <p className="text-sm flex gap-x-1">
                    <span className="font-semibold text-sm">Observations:</span>
                    <span className="font-extralight">
                      {client.observations || "No observations"}
                    </span>
                  </p>
                </div>
              ))}
            <h2 className="text-xl">Products</h2>
            {showProductSale && (
              <div className="border border-colorBorder p-2 flex flex-col gap-y-1">
                <table>
                  <thead>
                    <tr>
                      <th className="text-left">Product</th>
                      <th className="text-left">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {showProductSale?.map((productSale, index) => (
                      <tr
                        className={`${
                          showProductSale.length - 1 === index
                            ? ""
                            : "border-b border-colorBorder"
                        }`}
                        key={productSale.productId._id}
                      >
                        <td className="flex flex-col justify-center py-2">
                          {productSale.productId.code}
                          <span className="text-sm font-extralight">
                            {productSale.productId.name}
                          </span>
                        </td>
                        <td>${formatPrice(productSale.productId.price)}</td>
                        <td className="text-center">{productSale.quantity}</td>
                        <td className="text-center">
                          ${formatPrice(productSale.total)}
                        </td>
                        <td className="">
                          <div
                            className="hover:text-red-500 cursor-pointer mb-1 ps-2"
                            onClick={() =>
                              deleteProductList(productSale.productId._id)
                            }
                          >
                            <Trash2 size={20} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="grid grid-cols-12 gap-y-3 md:gap-y-0 gap-x-3 items-center">
              <div className="col-span-12 md:col-span-6">
                <select
                  id="productId"
                  className={` block w-full rounded-sm border py-2 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.productId
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                  {...register("productId")}
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option value="" disabled>
                    Select product
                  </option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 md:col-span-4">
                <input
                  type="number"
                  placeholder="quantity"
                  className={`w-full rounded-sm border py-1.5 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.quantity
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Number(e.target.value) < 0 ? 0 : Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="col-span-6 md:col-span-2">
                <button
                  type="button"
                  className="w-full bg-green-700 hover:bg-green-600 text-white rounded-sm py-1.5  flex items-center justify-center gap-x-2"
                  onClick={addProductList}
                >
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className="">
              <input
                type="date"
                className={`w-full rounded-sm border py-2 ps-4 focus:outline-none bg-inputBackground placeholder:text-gray-500 placeholder:font-light 
                      ${
                        errors.date
                          ? "border-red-500"
                          : "border-colorBorder focus:border-blue-700"
                      }
                  `}
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
              />
            </div>
            <hr className="h-px bg-colorBorder border-0" />
            {totalSale! > 0 && (
              <div className="text-right text-xl font-bold">${totalSale}</div>
            )}
            <div className="">
              <button
                type="submit"
                className="w-full min-h-10 bg-blue-700 hover:bg-blue-600 text-white rounded-sm py-2 mt-3 flex items-center justify-center gap-x-2"
              >
                {!loading ? (
                  <>
                    <Plus size={20} />
                    <span>Register Sale</span>
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
