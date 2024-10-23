import { Order } from "@/types";

interface InvoiceProps {
  order: Order;
}

export function Invoice({ order }: InvoiceProps) {
  function calculateTotal(products: { total: number }[]): number {
    const total = products.reduce((acc, product) => acc + product.total, 0);
    return total;
  }
  const { clientId, products, invoiceNumber } = order;
  return (
    <div className="bg-backgroundBox p-8 shadow-lg max-w-[550px] mx-auto mt-10">
      <h1 className="text-3xl font-medium mb-6 border-t-4 border-colorBorder pt-2 inline-flex">
        invoice
      </h1>
      <hr className="h-px border border-colorBorder mb-2" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Invoice Information</h2>
        <p className="flex justify-between">
          <span className="font-medium">Invoice Number:</span>
          <span className="font-extralight"># {invoiceNumber}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium">Date of creation:</span>
          <span className="font-extralight">
            {order.saleDate.split("-").join("/")}
          </span>
        </p>
      </div>
      <hr className="h-px border border-colorBorder mb-2" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Bill to:</h2>
        <div className="flex gap-x-1">
          <strong>Name:</strong>
          <p className="flex gap-x-1 font-light">
            {clientId.name} {clientId.lastname}
          </p>
        </div>
        <p>
          <strong>Phone:</strong> {clientId.phone}
        </p>
        <p>
          <strong>Address:</strong> {clientId.address}, {clientId.city},{" "}
          {clientId.state}
        </p>
      </div>
      <hr className="h-px border border-colorBorder mb-2" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productId.name}</td>
                <td className="text-center">{product.quantity}</td>
                <td className="text-right">${product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="h-px border border-colorBorder mb-2" />
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Total</h2>
        <p className="text-xl font-semibold">${calculateTotal(products)}</p>
      </div>
    </div>
  );
}
