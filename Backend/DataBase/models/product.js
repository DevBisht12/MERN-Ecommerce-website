import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgSrc1: {
    type: String,
    required: true,
  },
  imgSrc2: {
    type: String,
    required: true,
  },
  imgSrc3: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberofreviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
});

export const Product = mongoose.model("product", productSchema);
