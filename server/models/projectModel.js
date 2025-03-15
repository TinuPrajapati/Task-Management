const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    category: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    file: [
      {
        type: String,
        default: "",
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["pending", "accept", "complete", "reject"],
      default: "pending",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
