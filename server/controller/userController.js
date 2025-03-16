const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../middleware/emailManager.js");

exports.signup = async (req, res) => {
  const { name, email, role, password, number, address, gender, dob } = req.body;
  let path;
  let filename;
  if (req.file) {
    path = req.file.path;
    filename = req.file.filename;
  }

  try {
    // Check if the email or number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "This email already exists"
          : "This number already exists";
      return res.status(400).json({ message });
    }

    // // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // // Create new user
    const newUser = await User.create({
      name,
      role,
      email,
      password: hashedPassword,
      number,
      address,
      gender,
      dob,
      image: path,
      filename,
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(`Error come from signup Route : ${error}`);
    res.status(500).json({ message: "Error in creating new user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Please check your email again" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "token");
    res.cookie("dashboard", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(`Error come from Login Route : ${error}`);
    return res.status(500).json({ message: "Error! Please try again" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("dashboard", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(`Error come from Logout Route : ${error}`);
    return res.status(500).json({ message: "Error! Please try again" });
  }
};

// Fetch particular user by role
exports.particularRoleUser = async (req, res) => {
  const { role } = req.params;
  try {
    const users = await User.find({ role }, "id name role image email");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "User not found", error });
  }
};
exports.particularUser = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const users = await User.findOne({ name }, "id name email");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "User not found", error });
  }
};

// Fetch a single user by ID
exports.User = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId)
      .select("-password")
      .populate("self_todo");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "User details not Found", error });
  }
};

// Fetch all users
exports.allUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching all users details", error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role_type, number, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role_type, number, password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json("User details updated successfully");
  } catch (error) {
    res.status(500).json({ message: "Error in updating user details", error });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error: user not found", error });
  }
};
