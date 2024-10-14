import mongoose, { Schema, Document, Types } from "mongoose";

interface IProduct extends Document {
  productId: Types.ObjectId;
  quantity: number;
  total: number;
}

const productSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
});

interface ISale extends Document {
  clientId: Types.ObjectId;
  products: IProduct[];
  invoiceNumber: string;
}

const SaleSchema = new Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    products: {
      type: [productSchema],
      validate: [arrayMinLength, "No products in order"],
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

function arrayMinLength<T>(arr: T[]) {
  return arr.length > 0;
}

const Sale = mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
export default Sale;
