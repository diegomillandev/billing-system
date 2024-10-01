import { connectDB } from "@/db/mongoose";
import Category, { ICategory } from "@/models/Category.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  try {
    const dataCategory: ICategory = await req.json();

    const categoryExits = await Category.findById(id);

    if (!categoryExits) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    await Category.findByIdAndUpdate(id, dataCategory);
    return NextResponse.json({ message: "Category updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const { id } = params;
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
