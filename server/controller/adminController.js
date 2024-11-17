const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const Task = require("../models/taskModel");

exports.signup = async (req, res) => {
  const { name, email, role, password, admin } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json("User  already exists");
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

exports.task = async (req, res) => {
  const { category, assignedTo, taskTitle, completedDate, description } = req.body;
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

exports.showTasks = async (req, res) => {
  const allTask = await Task.find();
  res.status(200).json(allTask);
};
