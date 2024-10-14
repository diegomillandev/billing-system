import { connectDB } from "@/db/mongoose";
import Client from "@/models/Client.model";
import Product from "@/models/Product.model";
import Sale from "@/models/Sales.model";
import Stock from "@/models/Stock.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  try {
    const salesData = await req.json();
    const client = await Client.findById(salesData.clientId);

    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    const sale = new Sale(salesData);

    // Generate invoice number
    const lastSale = await Sale.findOne().sort({ createdAt: -1 });
    const lastInvoiceNumber = lastSale ? lastSale.invoiceNumber : "00000";
    const nextInvoiceNumber = (parseInt(lastInvoiceNumber, 10) + 1)
      .toString()
      .padStart(5, "0");

    sale.invoiceNumber = nextInvoiceNumber;
    client.buys += 1;

    for (const product of salesData.products) {
      const stock = await Stock.findOne({ productId: product.productId });

      if (!stock || stock.quantity < product.quantity) {
        const nameProduct = await Product.findById(product.productId);
        return NextResponse.json(
          { message: `Not enough stock for product ${nameProduct.code}` },
          { status: 400 }
        );
      }

      stock.quantity -= product.quantity;
      stock.sold += product.quantity;
      await stock.save();
    }

    console.log(salesData.products);
    await client.save();
    await sale.save();

    return NextResponse.json(
      { message: "Sale created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const sales = await Sale.find()
      .populate("clientId")
      .populate("products.productId");

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
