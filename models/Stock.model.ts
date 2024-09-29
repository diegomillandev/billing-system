import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStock extends Document {
  productId: Types.ObjectId;
  cuantity: number;
}

const StockSchema: Schema = new Schema(
  {
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    cuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Stock =
  mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema);
export default Stock;
