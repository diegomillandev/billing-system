import { connectDB } from "@/db/mongoose";
import Client, { IClient } from "@/models/Client.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  try {
    const dataClient: IClient = await req.json();
    const clientExists = await Client.findOne({
      $or: [{ phone: dataClient.phone }, { email: dataClient.email }],
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
    console.log(client);
    return NextResponse.json({ message: "Client created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const clients = await Client.find();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
