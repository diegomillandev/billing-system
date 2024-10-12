import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { IProduct } from "./Product.model";

export interface IStock extends Document {
  productId: PopulatedDoc<IProduct & Document>;
  quantity: number;
  sold: number;
}

const StockSchema: Schema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Stock =
  mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema);
export default Stock;
