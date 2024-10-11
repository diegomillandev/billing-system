import { Category, Product } from "@/types";
import { formatPrice } from "@/utils";
import { Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
interface Props {
  product?: Product;
  handleEditProduct: (product: Product) => void;
}
export function CardProduct({ product, handleEditProduct }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const nameCategory: Category = product?.categoryId as Category;

  const handleEdit = () => {
    const newUrl = `${pathname}?editProduct=${product?._id}`;
    router.push(newUrl);
    handleEditProduct(product!);
  };

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
      <div className="absolute bottom-2 right-2 group">
        <button
          className="text-colorText hover:bg-hoverButtons p-3 rounded-full"
          onClick={handleEdit}
        >
          <Settings size={24} className="text-colorText" />
        </button>
      </div>
    </div>
  );
}
