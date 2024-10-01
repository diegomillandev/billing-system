import { Category } from "@/types";
import { FlaskConical, SquarePen } from "lucide-react";
import { format } from "@formkit/tempo";
import { HoverTitle } from "@/components/HoverTitle";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  category: Category;
  handleCategoryEdit: (category: Category) => void;
}

export function CardCategory({ category, handleCategoryEdit }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleEditCategory = () => {
    const newUrl = `${pathname}?editCategory=${category._id}`;
    router.push(newUrl);
    handleCategoryEdit(category);
  };

  return (
    <div className=" relative bg-backgroundBox border border-colorBorder flex flex-col p-4">
      <FlaskConical size={32} className="mb-4 text-colorIcons" />
      <h2 className="text-colorText uppercase font-normal mb-1">
        {category.name}
      </h2>
      <p className="text-sm font-extralight flex-1">
        <span>{category.description}</span>
      </p>
      <div className="mt-5">
        <span className="text-sm">{format(category.updatedAt)}</span>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-x-3">
        <HoverTitle text="Edit">
          <SquarePen
            size={22}
            className=" hover:text-blue-600"
            onClick={handleEditCategory}
          />
        </HoverTitle>
      </div>
    </div>
  );
}
