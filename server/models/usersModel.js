const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image:{
      type:String,
      required:[true,"Please enter Employee image"]
    },
    name: {
      type: String,
      required: [true, "Please enter Employee name"],
    },
    role_type: {
      type: String,
      enum: ["Admin", "Employee", "HR", "Developer", "Designer"],
    },
    email: {
      type: String,
      required: [true, "Please enter Employee email"],
    },
    number: {
      type: Number,
      required: [true, "Please enter Employee phoneNumber"],
    },
    position:{
      type: String,
      required:[true,"Please enter Employee position"]
    },
    address:{
      type:String,
      required:[true,"Please enter Employee address"]
    },
    dob:{
      type:Date,
      required:[true,"Please enter Employee date of birth"]
    },
    gender:{
      type:String,
      enum:["Male","Female"],
      required:[true,"Please enter Employee gender"]
    },
    adminPassword: {
      type: String,
      required: [true, "Please enter Admin password"],
    },
    password: {
      type: String,
      required: [true, "Please enter Employee password"],
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
