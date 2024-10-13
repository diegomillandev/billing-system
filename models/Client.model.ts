import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  lastname?: string;
  dni?: string;
  email?: string;
  phone: string;
  address?: string;
  city: string;
  state: string;
  buys: number;
  observations?: string;
}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String },
    dni: { type: String },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    buys: { type: Number, default: 0 },
    observations: { type: String },
  },
  {
    timestamps: true,
  }
);

const Client =
  mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
export default Client;
