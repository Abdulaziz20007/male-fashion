const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Noto'g'ri email format",
      },
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    unsubscribed_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    // Add index for email queries
    indexes: [{ email: 1 }],
  }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
