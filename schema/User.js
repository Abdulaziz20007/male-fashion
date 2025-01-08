const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  refresh_token: {
    type: String,
    trim: true,
  },
  verification_id: {
    type: String,
    trim: true,
  },
});

module.exports = model("User", userSchema);
