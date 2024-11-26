// import mongoose, { Schema, Document, Model } from "mongoose";

// // Define an interface for the user document
// interface IUser extends Document {
//   name: string;
//   email: string;
//   mobile: string;
//   password: string;
//   is_admin: number;
//   is_varified?: number; // Optional because it has a default value
// }

// // Define the schema
// const userSchema: Schema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true, // Fixed typo from `require` to `required`
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   mobile: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   is_admin: {
//     type: Number,
//     required: true,
//   },
//   is_varified: {
//     type: Number,
//     default: 0,
//   },
// });

// // Export the model with the IUser interface
// const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
// export default User;


import { Document, Schema, model } from 'mongoose';

// Define the IUser interface
export interface IUser extends Document {
  _id: string;  // Explicitly type _id as a string
  name: string;
  email: string;
  password: string;
  mobile: string;
  is_admin: number;
}

// Define your schema here
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  is_admin: { type: Number, default: 0 },
});

const User = model<IUser>('User', userSchema);

export default User;


