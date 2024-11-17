const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Developer", "Designer", "HR", "All Employees"], // Enums for category options
  },
  assignedTo: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  completedDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  color:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true,
    enum:["pending","accept","complete","reject"],
    default:"pending"
  }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task
