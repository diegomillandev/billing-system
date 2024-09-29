import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IProduct } from "./Product.model";

export interface ICategory extends Document {
  name: string;
  description: string;
  active: string;
  products: PopulatedDoc<IProduct & Document>[];
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: String, required: true },
    products: [{ type: Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
