import { connectDB } from "@/db/mongoose";
import Category from "@/models/Category.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  try {
    const dataCategory = await req.json();

    // create new category
    const category = new Category(dataCategory);
    await category.save();

    return NextResponse.json({ message: "Category created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const categories = await Category.find();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
