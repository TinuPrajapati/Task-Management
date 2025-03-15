const Project = require("../models/projectModel");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const main = require("../middleware/emailManager.js");

// User Login
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
    res.clearCookie("dashboard");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(`Error come from Logout Route : ${error}`);
    return res.status(500).json({ message: "Error! Please try again" });
  }
};

// User Data
exports.data = async (req, res) => {
  const { username, role } = req.user;
  res.status(200).json({ username, role });
};

// Specific User Projects
exports.Projects = async (req, res) => {
  const { name } = req.params;

  try {
    const allProject = await Project.find({ assignedTo: name });
    res.status(200).json(allProject);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Update Project Status
exports.ProjectStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    await Project.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    );
    res.status(200).json("Your project status has been updated");
  } catch (error) {
    res.status(500).json({ message: "Error updating project status", error });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json("Project deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

// Send Email
exports.sendEmail = async (req, res) => {
  const { email, subject, value } = req.body;

  try {
    await main(email, subject, value);
    res.status(200).json("Email sent successfully");
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
};