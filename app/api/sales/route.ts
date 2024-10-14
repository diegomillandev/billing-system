import { connectDB } from "@/db/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  try {
    const salesData = await req.json();
    console.log(salesData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
