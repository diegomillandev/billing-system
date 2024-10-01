import { connectDB } from "@/db/mongoose";
import Category from "@/models/Category.model";
import Product, { IProduct } from "@/models/Product.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const dataProduct: IProduct = await req.json();

    const categoryExists = await Category.findById(dataProduct.categoryId);

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // create new stock
    const product = new Product(dataProduct);

    // add stock to category
    categoryExists.products.push(product._id);

    await Promise.allSettled([categoryExists.save(), product.save()]);

    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find().populate("categoryId");

    console.log(products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
