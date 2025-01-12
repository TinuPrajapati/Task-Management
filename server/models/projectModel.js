const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"]
  },
  favorite:{
    type:Boolean,
    default:false,
    required:true
  },
  startDate:{
    type:Date,
    default:null
  },
  endDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Developer", "Designer", "HR", "All Employees"],
  },
  ProjectTitle: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String, 
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
  assignedBy:{
    type:String,
    required:true
  }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
