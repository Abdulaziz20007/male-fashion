const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    trim: true,
  },
  colors: {
    type: [String],
    trim: true,
  },
  sizes: {
    type: [String],
    trim: true,
  },
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Product", productSchema);
