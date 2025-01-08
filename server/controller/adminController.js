const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const Task = require("../models/taskModel");

// Admin create new User
exports.signup = async (req, res) => {
  const { name, email, role, password, number } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "This email already exists"
          : "This number already exists";
      return res.status(400).json({ message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      name,
      email,
      role_type: role,
      password: hashedPassword,
      number,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Admin check all tasks
exports.allTasks = async (req, res) => {
  try {
    const allTask = await Task.find();
    res.status(200).json(allTask);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Admin create new Task
exports.createTask = async (req, res) => {
  const { category, assignedTo, taskTitle, completedDate, description, color } =
    req.body;
  try {
    const newTask = new Task({
      category,
      assignedTo,
      taskTitle,
      completedDate,
      description,
      color,
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Admin access particular task for update
exports.particularTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Admin Update Particular Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { category, assignedTo, taskTitle, completedDate, description, color } =
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
        color,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Fetch Users by Role
exports.Users = async (req, res) => {
  const { role } = req.body;

  try {
    const users = await User.find({ role_type: role }, "_id name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Fetch All Users
exports.allUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.favoriteUser=async(req,res)=>{
  const {id,favorite} = req.body;
  try {
    const user = await User.findByIdAndUpdate(id,{favorite},{runValidators:true});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json("User add in favorite list successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

// Delete User bg Id
exports.deleteUser = async (req,res)=>{
  const {id} = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
