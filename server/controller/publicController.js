const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const main = require("../middleware/emailManager.js");

// User Login


// User Data
exports.data = async (req, res) => {
  const { username, role } = req.user;
  res.status(200).json({ username, role });
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