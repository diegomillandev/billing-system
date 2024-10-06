import { Category, Product } from "@/types";
import { formatPrice } from "@/utils";
interface Props {
  product?: Product;
}
export function CardProduct({ product }: Props) {
  const nameCategory: Category = product?.categoryId as Category;

  return (
    <div className=" relative bg-backgroundBox border border-colorBorder flex flex-col p-4">
      <h2 className="text-colorText uppercase font-normal mb-1">
        <span className="">{product?.code}</span>
      </h2>
      <p>
        <span className="text-colorText text-xl font-bold">
          {product?.name}
        </span>
      </p>
      <p className="text-sm font-light flex-1">
        Description: <span>{product?.description}</span>
      </p>
      <p className="text-sm font-light">
        Category: <span className="font-light">{nameCategory.name}</span>
      </p>
      <div className="mt-5 flex flex-col">
        <span className="text-sm font-light">
          Price: $<span>{formatPrice(Number(product?.price))}</span>
        </span>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-x-3"></div>
    </div>
  );
}
