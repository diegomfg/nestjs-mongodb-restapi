import { Schema } from "mongoose";

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  descrition: String,
  imageUrl: String,
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})