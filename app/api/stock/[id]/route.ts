import { connectDB } from "@/db/mongoose";
import Stock, { IStock } from "@/models/Stock.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const { quantity }: { quantity: IStock["quantity"] } = await req.json();
    const stock: IStock | null = await Stock.findById(id);

    if (!stock) {
      return NextResponse.json({ message: "Stock not found" }, { status: 404 });
    }

    stock.quantity = quantity;

    await stock.save();

    return NextResponse.json({ message: "Stock updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
