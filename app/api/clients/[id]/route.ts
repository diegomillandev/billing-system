import { connectDB } from "@/db/mongoose";
import Client, { IClient } from "@/models/Client.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const dataClient: IClient = await req.json();

    const client: IClient | null = await Client.findById(id);

    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    if (client.phone !== dataClient.phone) {
      const phoneExists: IClient | null = await Client.findOne({
        phone: dataClient.phone,
      });
      if (phoneExists) {
        return NextResponse.json(
          { message: "Phone are already registered" },
          { status: 400 }
        );
      }
    }

    if (dataClient.email?.trim() && dataClient.email !== "") {
      if (client.email !== dataClient.email) {
        const emailExists: IClient | null = await Client.findOne({
          email: dataClient.email,
        });
        if (emailExists) {
          return NextResponse.json(
            { message: "Email are already registered" },
            { status: 400 }
          );
        }
      }
    }

    client.name = dataClient.name;
    client.lastname = dataClient.lastname;
    client.dni = dataClient.dni;
    client.email = dataClient.email;
    client.phone = dataClient.phone;
    client.address = dataClient.address;
    client.city = dataClient.city;
    client.state = dataClient.state;
    client.buys = dataClient.buys;
    client.observations = dataClient.observations;

    await client.save();

    return NextResponse.json({ message: "Client updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
