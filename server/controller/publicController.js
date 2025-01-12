const Project = require("../models/projectModel");
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

// Specific User Project
exports.Projects = async (req, res) => {
  const { name } = req.params;
  const allProject = await Project.find({ assignedTo: name });
  res.status(200).json(allProject);
};

// Specific User Project Status Updata
exports.ProjectStatus = async (req, res) => {
  const { id, status } = req.body;
  const Project = await Project.findByIdAndUpdate(
    id,
    { status: status.toLowerCase() },
    { new: true, runValidators: true }
  );
  res.status(200).json("Your Project status Update");
};

// Specific user Project delete
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const Project = await Project.findByIdAndDelete(id);
  res.status(200).json("Project deleted");
};
