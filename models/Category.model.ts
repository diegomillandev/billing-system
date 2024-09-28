import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  active: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: String, required: true },
});

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
