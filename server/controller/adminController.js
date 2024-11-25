const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const Task = require("../models/taskModel");

// Admin create new User
exports.signup = async (req, res) => {
  const { name, email, role, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json("User  already exists");
  }

  const userName = await User.findOne({ name });
  if (userName) {
    return res
      .status(400)
      .json("User name already exists. Please choose Different Name");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  await User.create({
    name,
    email,
    role_type: role,
    password: hashedPassword,
  });

  res.status(201).json("User  created successfully");
};

// Admin check All Task
exports.allTasks = async (req, res) => {
  const allTask = await Task.find();
  res.status(200).json(allTask);
};

// Admin create new Task
exports.createTask = async (req, res) => {
  const { category, assignedTo, taskTitle, completedDate, description } =
    req.body;
  const Colors = [
    "#0369a1", // bg-sky-700
    "#1d4ed8", // bg-blue-700
    "#3730a3", // bg-indigo-800
    "#5b21b6", // bg-purple-800
    "#be185d", // bg-pink-700
    "#047857", // bg-green-700
    "#047857", // bg-emerald-700
    "#ca8a04", // bg-yellow-600
    "#c2410c", // bg-orange-700
    "#b91c1c", // bg-red-700
  ];

  const index = Math.floor(Math.random() * Colors.length);
  try {
    const newTask = new Task({
      category,
      assignedTo,
      taskTitle,
      completedDate,
      description,
      color: Colors[index],
    });

    await newTask.save();
    res.status(201).json("Task created successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Admin access particular task for update
exports.particularTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.status(200).json(task);
};

// Admin Update Particular Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { category, assignedTo, taskTitle, completedDate, description } =
    req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        category,
        assignedTo,
        taskTitle,
        completedDate,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json("Task Update");
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.Users = async (req, res) => {
  const { role } = req.body;
  const users = await User.find({ role_type: role }, "id name");
  res.status(200).json(users);
};

exports.allUser = async (req, res) => {
  const users = await User.find({}, "id name email role_type createdAt");
  res.status(200).json(users);
};
