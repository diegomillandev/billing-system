import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  rol: string;
  imageURl?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rol: { type: String, required: true, default: "user" },
  password: { type: String, required: true },
  imageUrl: { type: String },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
