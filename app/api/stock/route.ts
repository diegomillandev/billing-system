import { connectDB } from "@/db/mongoose";
import Product from "@/models/Product.model";
import Stock, { IStock } from "@/models/Stock.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  try {
    const dataStock: IStock = await req.json();

    const productExits = await Product.findById(dataStock.productId);

    if (!productExits) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const stockExits = await Stock.findById(productExits.stock);

    if (stockExits) {
      stockExits.cuantity =
        Number(stockExits.cuantity) + Number(dataStock.cuantity);
      await stockExits.save();
      return NextResponse.json({ message: "Stock updated" }, { status: 200 });
    }

    const stock = new Stock(dataStock);
    productExits.stock = stock._id;

    await Promise.allSettled([stock.save(), productExits.save()]);

    return NextResponse.json({ message: "Stock created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
