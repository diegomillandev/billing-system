"use client";
import { useEffect, useState } from "react";
import { ModalAddCategory } from "../ModalAddCategory";
import { Category, CategorySelect } from "@/types";
import { toast } from "react-toastify";
import { CardCategory } from "../CardCategory";
import { Loader } from "@/components/Loader";
import { ModalEditCategory } from "../ModalEditCategory";

export function WrapperCards() {
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryEdit, setCategoryEdit] = useState<Category>();

  const handleReload = () => {
    setReload(!reload);
  };

  const handleCategoryEdit = (category: Category) => {
    setCategoryEdit(category);
  };

  const clearCategoryEdit = () => {
    setCategoryEdit(undefined);
  };

  const getCategories = async () => {
    if (!categories.length) setLoading(true);
    try {
      const response = await fetch("/api/categories");
      const data = CategorySelect.safeParse(await response.json());
      if (data.success) {
        setCategories(data.data as Category[]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error to get categories, try again later");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
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
      <main className="mt-10">
        {categories.length === 0 ? (
          <div className="flex items-center justify-center mt-10 ">
            <p className="text-colorText">No categories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CardCategory
                key={category._id}
                category={category}
                handleCategoryEdit={handleCategoryEdit}
              />
            ))}
          </div>
        )}
      </main>
      <ModalAddCategory handleReload={handleReload} />
      {categoryEdit && (
        <ModalEditCategory
          handleReload={handleReload}
          categoryEdit={categoryEdit}
          clearCategoryEdit={clearCategoryEdit}
        />
      )}
    </>
  );
}
