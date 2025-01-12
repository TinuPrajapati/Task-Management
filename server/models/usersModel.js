const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    role_type: {
      type: String,
      enum: ["Admin", "Employee", "HR", "Developer", "Designer"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    number: {
      type: Number,
      required: [true, "Please enter your phone number"],
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
