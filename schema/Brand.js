const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

module.exports = model("Brand", brandSchema);
