const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Developer", "Designer", "HR", "All Employees"], // Enums for category options
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User
    ref: "User", // Model name to reference
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  completedDate: {
    type: Date, // Use Date type for better date handling
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "accept", "complete", "reject"],
    default: "pending",
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
