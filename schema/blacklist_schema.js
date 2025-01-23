const { Schema, model } = require("mongoose");

const blacklistSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    blocked_user_reason: {
      type: String,
      required: true,
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    baned_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Blacklist", blacklistSchema);
