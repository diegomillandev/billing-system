import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  code: string;
  name: string;
  price: number;
  costPrice: number;
  categoryId: Types.ObjectId;
  stock: Types.ObjectId;
  description: string;
}

const ProductSchema: Schema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    stock: { type: Types.ObjectId, ref: "Stock", default: null },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
