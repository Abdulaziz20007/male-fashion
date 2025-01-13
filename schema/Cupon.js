const { Schema, model } = require("mongoose");

const cuponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    min_purchase: {
      type: Number,
      default: 0,
    },
    usage_limit: {
      type: Number,
      default: 1,
    },
    used_count: {
      type: Number,
      default: 0,
    },
    products: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cupon", cuponSchema);
