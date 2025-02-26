const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const SelfTodo = mongoose.model("SelfTodo", todoSchema);

module.exports = SelfTodo;
