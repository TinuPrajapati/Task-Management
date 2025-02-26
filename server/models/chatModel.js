const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    receriverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
