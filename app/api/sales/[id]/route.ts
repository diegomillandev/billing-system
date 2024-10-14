import { connectDB } from "@/db/mongoose";
import Sale from "@/models/Sales.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  try {
    const sale = await Sale.findById(id)
      .populate("clientId")
      .populate("products.productId");

    if (!sale) {
      return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    }

    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
