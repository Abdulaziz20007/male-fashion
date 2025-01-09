const { Schema, model } = require("mongoose");

const cart_itemsSchema = new Schema({
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: "Carts",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = model("Cart_items", cart_itemsSchema);
