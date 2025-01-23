const { Schema, model } = require("mongoose");

const cartsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total_amout: {
    type: Number,
    required: true,
  },
});

module.exports = model("Carts", cartsSchema);
