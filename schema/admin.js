const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_creator: {
    type: Boolean,
    default: false,
  },
  refresh_token: {
    type: String,
  },
});

module.exports = model("Admin", AdminSchema);
