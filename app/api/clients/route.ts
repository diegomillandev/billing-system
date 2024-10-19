import { connectDB } from "@/db/mongoose";
import Client, { IClient } from "@/models/Client.model";
import { NextResponse } from "next/server";

interface searchConditionsArray {
  phone?: IClient["phone"];
  email?: IClient["email"];
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const dataClient: IClient = await req.json();
    const phone: IClient["phone"] = dataClient.phone;
    const email: IClient["email"] = dataClient.email;
    const searchConditions: searchConditionsArray[] = [{ phone }];

    if (email) {
      searchConditions.push({ email });
    }
    const clientExists = await Client.findOne({
      $or: searchConditions,
    });
    // check if client exists
    if (clientExists) {
      return NextResponse.json(
        { message: "Client already exists" },
        { status: 400 }
      );
    }

    // create new client
    const client = new Client(dataClient);
    await client.save();
    return NextResponse.json({ message: "Client created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const clients = await Client.find().sort({ name: 1 });
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
