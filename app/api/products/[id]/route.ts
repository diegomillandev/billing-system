import { connectDB } from "@/db/mongoose";
import Category, { ICategory } from "@/models/Category.model";
import Product, { IProduct } from "@/models/Product.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  try {
    const dataProduct: IProduct = await req.json();

    const product: IProduct | null = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const categoryExists: ICategory | null = await Category.findById(
      dataProduct.categoryId
    );

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const categoryOld = product.categoryId;

    if (categoryOld !== dataProduct.categoryId) {
      const categoryOldExists: ICategory | null = await Category.findById(
        categoryOld
      );

      if (categoryOldExists) {
        categoryOldExists.products = categoryOldExists.products.filter(
          (productId) => productId?.toString() !== id
        );

        await categoryOldExists.save();
      }
      categoryExists.products.push(product.id);
      categoryExists.save();
    }

    product.code = dataProduct.code;
    product.name = dataProduct.name;
    product.price = dataProduct.price;
    product.costPrice = dataProduct.costPrice;
    product.categoryId = dataProduct.categoryId;
    product.description = dataProduct.description;

    product.save();

    return NextResponse.json({ message: "Product updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
