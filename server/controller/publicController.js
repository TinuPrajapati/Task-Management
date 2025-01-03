const Task = require("../models/taskModel");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json("Please check your email again");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json("Invalid password");
  }

  const token = jwt.sign({role:user.role_type,username:user.name},"token");
  return res
    .status(200)
    .json(token);
};

exports.data= async(req,res)=>{
  const {username,role} = req.user;
  res.status(200).json({username,role,msg:"User Login Successfully"});
}

// Specific User Task
exports.tasks = async (req, res) => {
  const { name } = req.params;
  const allTask = await Task.find({ assignedTo: name });
  res.status(200).json(allTask);
};

// Specific User Task Status Updata
exports.taskStatus = async (req, res) => {
  const { id, status } = req.body;
  const task = await Task.findByIdAndUpdate(
    id,
    { status: status.toLowerCase() },
    { new: true, runValidators: true }
  );
  res.status(200).json("Your task status Update");
};

// Specific user task delete
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const task = await Task.findByIdAndDelete(id);
  res.status(200).json("Task deleted");
};
