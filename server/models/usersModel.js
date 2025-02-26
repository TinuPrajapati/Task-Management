const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Please enter Employee image"],
    },
    filename: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please enter Employee name"],
    },
    role: {
      type: String,
      required: [true, "Please enter Employee role"],
    },
    email: {
      type: String,
      required: [true, "Please enter Employee email"],
    },
    number: {
      type: Number,
      required: [true, "Please enter Employee phoneNumber"],
    },
    address: {
      type: String,
      required: [true, "Please enter Employee address"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Employee date of birth"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Please enter Employee gender"],
    },
    password: {
      type: String,
      required: [true, "Please enter Employee password"],
    },
    self_todo: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "SelfTodo"
    }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
