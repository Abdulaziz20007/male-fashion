const { Schema, model } = require("mongoose");

const contact_messagesSchema = new Schema(
  {
    name: {
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
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "read"],
      default: "sent",
    },
    resolved_at: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt va updatedAt qo'shiladi
  }
);

module.exports = model("Contact_messages", contact_messagesSchema);
