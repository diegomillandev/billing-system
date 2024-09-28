import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  lastname: string;
  dni?: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    dni: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    observations: { type: String },
  },
  {
    timestamps: true,
  }
);

const Client =
  mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
export default Client;
